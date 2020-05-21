import React, { Component } from "react";
import PieChart from "./../../../Common/pieChart";

class UsersPieChart extends Component {
  state = {
    chartData: {},
  };

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: ["CUSTOMERS", "DEVELOPERS"],
        datasets: [
          {
            // label: "INCOME",
            data: [617594, 181045],
            backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
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
          title="Current Users Of SLExpress"
        />
      </div>
    );
  }
}

export default UsersPieChart;
