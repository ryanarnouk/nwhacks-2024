import React from 'react';
import { Card, Flex, Text, ProgressCircle } from "@tremor/react";

const MainAssessment = (props) => {
  return (
    <div className='p-3 h-full'>
        <Card className="max-w-sm mx-auto flex flex-col gap-4 h-full">
            <Text className='text-xl text-center light:text-white font-bold'>Air Quality Score</Text>
            <div className="space-x-5 items-center">
                <ProgressCircle value={100} size="xl">
                    <span className="text-5xl font-medium dark:text-dark-tremor-content-emphasis">{props.data.iaq.value}</span>
                </ProgressCircle>
            </div>

            <div className='flex flex-col gap-4 m-2 justify-left'>
                <h1 className="text-3xl font-bold dark:text-dark-tremor-content-emphasis">Feedback</h1>
                <div className="overflow-auto max-h-96"> 
                    <p className="text-sm dark:text-dark-tremor-content-emphasis">{props.feedback}</p>
                </div>
            </div>
        </Card>
    </div>
  );
}

export default MainAssessment;
