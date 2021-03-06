import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            chart: {
                labels: [this.props.labels],
                datasets: [
                    {
                        label: 'My First dataset',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: '#4982b1',
                        borderColor: '#4982b1',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [this.props.data]
                    }
                ]
            }
        }
    }

    render() {
        const chart = {
            labels: this.props.labels,
                datasets: [
                    {
                        label: 'My First dataset',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: '#4982b1',
                        borderColor: '#4982b1',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.props.data
                    }
                ]
        }
        return (
            <div>
                <h2><b>Bar Chart</b></h2>
                <Bar 
                    ref="chart" 
                    height={130}
                    data={chart}
                />
            </div>
        )
    }
}