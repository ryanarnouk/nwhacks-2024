import React from 'react'
import { Grid, Col, Card, Text, Metric } from "@tremor/react";

const MainData = () => {
  return (
    <div className='m-3'>
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-3">
            <Col numColSpan={1} numColSpanLg={2}>
                <Card>
                <Text>Title</Text>
                <Metric>Graph</Metric>
                </Card>
            </Col>
            <Card>
                <Text>Title</Text>
                <Metric>123</Metric>
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