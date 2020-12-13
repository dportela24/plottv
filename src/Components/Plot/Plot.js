import { ResponsiveScatterPlot } from '@nivo/scatterplot'
 
const data2 = [
    {
      "id": "group A",
      "data": [
        {
          "x": 77,
          "y": 22
        },
        {
          "x": 40,
          "y": 9
        },
        {
          "x": 79,
          "y": 56
        }
      ]
    }]

const Plot = (props) => (
    <ResponsiveScatterPlot
        data={props.seasonsData}
        margin={{ top: 60, right: 50, bottom: 70, left: 90 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        blendMode="multiply"
        enableGridX={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Episode',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -20,
            legend: 'Rating',
            legendPosition: 'middle',
            legendOffset: -60
        }}
    />
)

export default Plot;