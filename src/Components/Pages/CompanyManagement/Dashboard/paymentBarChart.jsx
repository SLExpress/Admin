import React, { Component } from "react";
import BarChart from "./../../../Common/barChart";

class PaymentBarChart extends Component {
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
            backgroundColor: "rgba(191, 0, 255,0.6)",
            label: "PAYMENTS",
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
          },
        ],
      },
    });
  }

  render() {
    return (
      <div style={{ position: "relative", width: 600, heigth: 650 }}>
        <BarChart
          data={this.state.chartData}
          title="Annual Payments Of SLExpress"
          chart="Bar"
        />
      </div>
    );
  }
}

export default PaymentBarChart;
