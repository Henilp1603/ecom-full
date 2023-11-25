import { BadgeDelta, Card, Flex, Metric, ProgressBar, Text } from "@tremor/react";

export default function DetailsCard({title,value}) {
  return (
    <>
     <Card className="max-w-xs mx-auto" decoration="top" decorationColor="blue">
    <Text>{title}</Text>
    <Metric>{value}</Metric>
  </Card>
    </>
  )
}
