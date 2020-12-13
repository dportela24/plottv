import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { Fragment } from 'react';
import * as utils from '../../utils';

const Plot = (props) => (
    <Fragment>
        <ResponsiveScatterPlot
            data={props.seasonsData}
            margin={{ top: 60, right: 50, bottom: 70, left: 80 }}
            xScale={{ type: 'linear', min: 1, max: 'auto' }}
            yScale={{ type: 'linear', min: Math.floor(props.minRating*2)/2, max: Math.ceil(props.maxRating*2)/2 }}
            useMesh={false}
            colors={{ scheme: 'set1' }}
            enableGridX={false}
            onClick={props.onClick}
            theme={{
                "background": "#1d262b",
                "textColor": "#ccc",
                "axis": {
                    "ticks": {
                        "line": {
                            "stroke": "#ccc",
                            "strokeWidth": "0.3px"
                        }
                    }
                },
                "grid": {
                    "line": {
                        "strokeWidth": "0.3px"
                    }
                }
            }}
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
            tooltip={({ node }) => (
                <div
                    style={{
                        color: "#1d262b",
                        background: '#ccc',
                        padding: '8px 12px',
                        border: "3px solid #3c91e8",
                        borderRadius: "5px 0 0 5px",
                        overflow: "visible",
                    }}
                >
                    <strong>
                        {`${node.data.title}`}
                    </strong>
                    <br/>
                    {`s${utils.atLeastTwoDigits(node.data.serieId)}e${utils.atLeastTwoDigits(node.data.number)}`}
                    <br />
                    {node.data.airdate}
                    <br />
                    {`Rating: ${node.data.ratingValue} (${utils.numberWithCommas(node.data.ratingCount)})`}
                    
                </div>
            )}
        />
    </Fragment>
)

export default Plot;