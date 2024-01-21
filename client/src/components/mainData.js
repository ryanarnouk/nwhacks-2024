import { useState } from 'react';
import { Grid, Col, Card, Text, Metric, LineChart, Button } from "@tremor/react";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { Tooltip } from 'react-tooltip';
// import { FaPerson } from "react-icons/fa6";
import { FaDog, FaRunning } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { CgSleep } from "react-icons/cg";
import { MdAir } from "react-icons/md";
import BufferStream from '../helpers/BufferStream';

const MainData = (props) => {
  const [graphVar, setGraphVar] = useState("Temperature");
  const [generatingFeedback, setGeneratingFeedback] = useState(false);

  const graphLegend = {
    "Temperature": "Temperature (°C)",
    "CO2": "Carbon Dioxide in Air (PPM)",
    "Humidity": "Humidity (%)",
    "IAQ": "Indoor Air Quality (PPM)",
  }

  const maxSize = 10;
  const bufferStream = new BufferStream(maxSize);
  let times = ["12:00", "12:05", "12:10", "12:15", "12:20", "12:25", "12:30", "12:35", "12:45", "12:50"]
  for (let i = 0; i < 100; i++) {
    bufferStream.add(
      {
        time: times[i % 10],
        "temperature": i,
      });
  }

  const testData = bufferStream.getBuffer();

  
  // Make a POST request to the API to generate GPT feedback
  const generateFeedback = async (impactType) => {
    try {
      setGeneratingFeedback(true);
      // Build the form data to send to the API
      const formData = new FormData();
      
      formData.append("impactType", impactType);
      formData.append("temperature", props.data.temperature.value);
      formData.append("humidity", props.data.humidity.value);
      formData.append("airPressure", props.data.pressure.value);
      formData.append("co2", props.data.co2_equivalent.value);
      formData.append("breathVOC", props.data.breath_voc_equivalent.value);
      formData.append("iaq", props.data.iaq.value);

      // Send request to API endpoint
      // TODO: Replace API endpoint
      const response = await fetch('http://127.0.0.1:105/generate_feedback', {
        method: 'POST',  
        headers: {
          // Auth?
        },
        body: formData,
      });
      
      const data = await response.json();
      console.log(data);  // Handle the API response data as needed
      props.setFeedback(data.response);
    } catch (error) {
      console.error('Error fetching impact data:', error);
    }

    setGeneratingFeedback(false);
  };


  return (
      <div className='m-3'>
          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-3">
              <Col numColSpan={1} numColSpanLg={2}>
                  <Card>
                      <div className='flex items-center '>
                        <div>
                          <select
                            className="dark:bg-gray-800 dark:text-white bg-gray-200 rounded-md px-2 py-1"
                            value={graphVar}
                            onChange={(e) => setGraphVar(e.target.value)}
                          >
                            <option value="Temperature">Temperature</option>
                            <option value="CO2">CO2</option>
                            <option value="Humidity">Humidity</option>
                            <option value="IAQ">IAQ</option>
                          </select>
                        </div>
                        <h1 className='w-full text-center font-bold dark:text-dark-tremor-content-emphasis font-xl'>{graphVar}</h1>
                        <Button data-tooltip-id="help-tooltip" data-tooltip-content={graphLegend[graphVar]}
                            classNamesize="xs" style={{ borderRadius: '2em' }}><h1 className='text-white'>?</h1></Button>
                      </div>
                      {/* <Metric>Graph</Metric> */}
                      <LineChart
                          className="h-72 mt-4"
                          data={testData}
                          index="time"
                          categories={["temperature"]}
                          colors={["neutral", "indigo"]}
                          yAxisWidth={30}
                          // onValueChange={(v) => setValue(v)}
                          connectNulls={true}
                      />
                  </Card>
              </Col>
              <Card>
                  <Metric className='w-full h-full'>
                    <APIProvider apiKey={"AIzaSyAB5cNz-D_fzJbDJFXTOXYc5P5jF8oI2x4"}>
                      <Map
                        zoom={3}
                        center={{lat: props.data.latitude.value, lng: props.data.longitude.value}}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        style={{ borderRadius: '0.2em' }}
                      >
                        <Marker position={{lat: props.data.latitude.value, lng: props.data.longitude.value}} />
                      </Map>
                    </APIProvider>
                  </Metric>
              </Card>
              <Col>
                  <Card>
                  <Text>Temperature</Text>
                  <Metric>{props.data.temperature.value + " " + props.data.temperature.unit}</Metric>
                  </Card>
              </Col>
              <Card>
                  <Text>CO2</Text>
                  <Metric>{props.data.co2_equivalent.value + " " + props.data.co2_equivalent.unit}</Metric>
              </Card>
              <Card>
                  <Text>Humidity</Text>
                  <Metric>{props.data.humidity.value + props.data.humidity.unit}</Metric>
              </Card>
              <Col>
                  <Card>
                  <Text>Air Pressure</Text>
                  <Metric>{props.data.pressure.value + " " + props.data.pressure.unit}</Metric>
                  </Card>
              </Col>
              <Card>
                  <Text>VOC</Text>
                  <Metric>{props.data.breath_voc_equivalent.value + " " + props.data.breath_voc_equivalent.unit}</Metric>
              </Card>
              <Card>
                  <Text>Altitude</Text>
                  <Metric>{props.data.altitude.value + "m"}</Metric>
              </Card>
              <Col numColSpan={1} numColSpanLg={3}>
              <Card className="w-full">
                <div className='flex flex-row items-center justify-around'>
                  {generatingFeedback ? 
                    <div role="status">
                      <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                    : 
                    <div className='flex flex-row items-center gap-4'> {/* Adjust the gap value based on your preference */}
                    <Button classNamesize="xs" onClick={() => (generateFeedback("Plant"))}>
                      <h1 className='text-white flex items-center gap-2'><PiPlantFill size={20}/> Plant Impact</h1>
                    </Button>
                    <Button classNamesize="xs" onClick={() => (generateFeedback("Animal"))}>
                      <h1 className='text-white flex items-center gap-2'><FaDog size={20}/> Animal Impact</h1>
                    </Button>
                    <Button classNamesize="xs" onClick={() => (generateFeedback("Sleep"))}>
                      <h1 className='text-white flex items-center gap-2'><CgSleep size={20}/> Sleep Impact</h1>
                    </Button>
                    <Button classNamesize="xs" onClick={() => (generateFeedback("Exercise"))}>
                      <h1 className='text-white flex items-center gap-2'><FaRunning size={20}/> Exercise Impact</h1>
                    </Button>
                    <Button classNamesize="xs" onClick={() => (generateFeedback("Breathing"))}>
                      <h1 className='text-white flex items-center gap-2'><MdAir size={20}/> Breathing Impact</h1>
                    </Button>
                  </div>
                  }
                </div>
              </Card>
              </Col>
          </Grid>
          <Tooltip id="help-tooltip" />
      </div>
  )
}

export default MainData