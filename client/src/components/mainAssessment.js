import React from 'react'
import { Card, Flex, Text, ProgressCircle } from "@tremor/react";


const MainAssessment = () => {
  return (
    <div className='m-3'>
        <div className="space-y-3">
            <Card className="max-w-sm mx-auto">
                <Flex className="space-x-5" justifyContent="center">
                    <ProgressCircle value={75} size="xl">
                        <span className="text-5xl text-white font-medium">10</span>
                    </ProgressCircle>
                </Flex>
            </Card>
        </div>
    </div>
  )
}

export default MainAssessment