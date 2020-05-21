import React, { Component } from "react";
import PieChart from "./../../../Common/pieChart";

class IncomePieChart extends Component {
  state = {
    chartData: {},
  };

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ["PAYMENTS", "PROFIT"],
        datasets: [
          {
            // label: "INCOME",
            data: [617594, 481045],
            backgroundColor: ["rgba(255, 191, 0,0.6)", "rgba(0, 191, 255,0.6)"],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div style={{ position: "relative", width: 450, heigth: 650 }}>
        <PieChart
          data={this.state.chartData}
          title="Current Income Of SLExpress"
        />
      </div>
    );
  }
}

export default IncomePieChart;
