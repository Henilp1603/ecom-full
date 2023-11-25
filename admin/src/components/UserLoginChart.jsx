import { Card, LineChart, Title } from "@tremor/react";

const chartdata = [
    {
      year: 1970,
      "Export Growth Rate": 2.04,
      "Import Growth Rate": 1.53,
    },
    {
      year: 1971,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.58,
    },
    {
      year: 1972,
      "Export Growth Rate": 1.96,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1973,
      "Export Growth Rate": 1.93,
      "Import Growth Rate": 1.61,
    },
    {
      year: 1974,
      "Export Growth Rate": 1.88,
      "Import Growth Rate": 1.67,
    },
    //...
  ];
  
  const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function UserLoginChart() {
  return (
    <Card className="mx-auto">
    <Title>Total Users Logged In</Title>
    <LineChart
      className="mt-6"
      data={chartdata}
      index="year"
      categories={["Export Growth Rate", "Import Growth Rate"]}
      colors={["blue", "gray"]}
      valueFormatter={valueFormatter}
      yAxisWidth={40}
    />
  </Card>
  )
}
