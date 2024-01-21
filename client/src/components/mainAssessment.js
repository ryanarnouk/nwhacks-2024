import React from 'react'
import { Card, Flex, Text, ProgressCircle } from "@tremor/react";

const MainAssessment = (props) => {
  return (
    <div className='m-3 h-full'>
        <div className="space-y-3 h-full">
            <Card className="max-w-sm mx-auto flex flex-col gap-4 h-full">
                <Text className='text-xl text-center light:text-white font-bold'>Air Quality Score</Text>
                <div className="space-x-5 items-center">
                    <ProgressCircle value={100} size="xl">
                        <span className="text-5xl font-medium dark:text-dark-tremor-content-emphasis">{props.data.iaq.value}</span>
                    </ProgressCircle>
                </div>

                <div className='flex flex-col gap-4 m-2 justify-left'>
                    <h1 className="text-3xl font-bold dark:text-dark-tremor-content-emphasis">Feedback</h1>
                    <ul className="list-disc pl-4">
                        <li className="text-lg dark:text-dark-tremor-content-emphasis">Point 1</li>
                        <li className="text-lg dark:text-dark-tremor-content-emphasis">Point 2</li>
                        <li className="text-lg dark:text-dark-tremor-content-emphasis">Point 3</li>
                        <li className="text-lg dark:text-dark-tremor-content-emphasis">Point 4</li>
                        <li className="text-lg dark:text-dark-tremor-content-emphasis">Point 5</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default MainAssessment