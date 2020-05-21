import React, { Component } from "react";
import BarChart from "./../../../Common/barChart";

class ProfitBarChart extends Component {
  state = {
    chartData: {},
  };

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            backgroundColor: "rgba(249, 6, 6,0.6)",
            label: "Profit",
            data: [
              617594,
              181045,
              553060,
              106519,
              105162,
              455072,
              152445,
              124578,
              220125,
              525122,
              235628,
              541228,
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div style={{ position: "relative", width: 500, heigth: 650 }}>
        <BarChart
          data={this.state.chartData}
          title="Annual Profit Of SLExpress"
          chart="Bar"
        />
      </div>
    );
  }
}

export default ProfitBarChart;
