import { useState } from 'react';
import { Grid, Col, Card, Text, Metric, LineChart, Button } from "@tremor/react";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { Tooltip } from 'react-tooltip';


const MainData = (props) => {
  const [graphVar, setGraphVar] = useState("Temperature");

  const testData = [
      {
        date: "Jan 23",
        "2022": 45,
        "2023": 78,
      },
      {
        date: "Feb 23",
        "2022": 52,
        "2023": 71,
      },
      {
        date: "Mar 23",
        "2022": 48,
        "2023": 80,
      },
      {
        date: "Apr 23",
        "2022": 61,
        "2023": 65,
      },
      {
        date: "May 23",
        "2022": 55,
        "2023": 58,
      },
      {
        date: "Jun 23",
        "2022": 67,
        "2023": 62,
      },
      {
        date: "Jul 23",
        "2022": 60,
        "2023": 54,
      },
      {
        date: "Aug 23",
        "2022": 72,
        "2023": 49,
      },
      {
        date: "Sep 23",
        "2022": 65,
        "2023": 52,
      },
      {
        date: "Oct 23",
        "2022": 68,
        "2023": null,
      },
      {
        date: "Nov 23",
        "2022": 74,
        "2023": null,
      },
      {
        date: "Dec 23",
        "2022": 71,
        "2023": null,
      },
  ];


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
                        <Button data-tooltip-id="help-tooltip" data-tooltip-content="Hello world!" 
                            classNamesize="xs" style={{ borderRadius: '2em' }}><h1 className='text-white'>?</h1></Button>
                      </div>
                      {/* <Metric>Graph</Metric> */}
                      <LineChart
                          className="h-72 mt-4"
                          data={testData}
                          index="date"
                          categories={["2022", "2023"]}
                          colors={["neutral", "indigo"]}
                          yAxisWidth={30}
                          // onValueChange={(v) => setValue(v)}
                          connectNulls={true}
                      />
                  </Card>
              </Col>
              <Card>
                  <Metric className='w-full h-full'>
                    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                      <Map
                        zoom={3}
                        center={{lat: 22.54992, lng: 0}}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        style={{ borderRadius: '0.2em' }}
                      >
                        <Marker position={{lat: 22.54992, lng: 0}} />
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
                  <Text>IAQ Accuracy</Text>
                  <Metric>{props.data.iaq_accuracy.value}</Metric>
              </Card>
              <Col numColSpan={1} numColSpanLg={3}>
                <Card className="w-full">
                  <div className=''>
                    <div className='flex flex-row items-center justify-between'>
                      <h1 className='text-lg font-bold dark:text-dark-tremor-content-emphasis'>
                        Context
                      </h1>
                      <div className='flex flex-row'>
                      <Button data-tooltip-id="help-tooltip" data-tooltip-content="Hello world!" 
                            classNamesize="xs" style={{ borderRadius: '2em' }}><h1 className='text-white'>?</h1></Button>
                            <Button data-tooltip-id="help-tooltip" data-tooltip-content="Hello world!" 
                            classNamesize="xs" style={{ borderRadius: '2em' }}><h1 className='text-white'>?</h1></Button>
                            <Button data-tooltip-id="help-tooltip" data-tooltip-content="Hello world!" 
                            classNamesize="xs" style={{ borderRadius: '2em' }}><h1 className='text-white'>?</h1></Button>

                      </div>
                      <Button classNamesize="xs"><h1 className='text-white'>Submit</h1></Button>
                    </div>
                  </div>
                </Card>
              </Col>
          </Grid>
          <Tooltip id="help-tooltip" />
      </div>
  )
}

export default MainData