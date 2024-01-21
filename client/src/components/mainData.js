import React from 'react'
import { Grid, Col, Card, Text, Metric, LineChart } from "@tremor/react";

const MainData = () => {
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
                        <Text>Title</Text>
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
                    <Text>Map</Text>
                    <Metric>Map</Metric>
                </Card>
                <Col>
                    <Card>
                    <Text>Temperature</Text>
                    <Metric>24</Metric>
                    </Card>
                </Col>
                <Card>
                    <Text>CO2</Text>
                    <Metric>4.3</Metric>
                </Card>
                <Card>
                    <Text>Humidity</Text>
                    <Metric>1.2</Metric>
                </Card>
            </Grid>
        </div>
    )
}

export default MainData