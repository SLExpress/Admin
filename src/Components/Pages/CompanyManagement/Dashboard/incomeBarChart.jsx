import React, { Component } from "react";
import BarChart from "./../../../Common/barChart";

class IncomeBarChart extends Component {
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
            // backgroundColor: "rgba(255,99,132,0.6)",
            label: "INCOME",
            data: [
              617594,
              181045,
              153060,
              106519,
              105162,
              954072,
              152445,
              124578,
              20125,
              325122,
              235628,
              541228,
            ],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,159,64,0.6)",
              "rgba(255,19,132,0.6)",
              "rgba(55,559,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,12,0.6)",
              "rgba(255,19,64,0.6)",
              "rgba(25,139,132,0.6)",
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
          title="Annual Income Of SLExpress"
          chart="Bar"
        />
      </div>
    );
  }
}

export default IncomeBarChart;
