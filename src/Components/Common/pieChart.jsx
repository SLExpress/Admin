import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  state = {
    chartData: this.props.data,
  };

  render() {
    const title = this.props.title;
    return (
      <Pie
        data={this.state.chartData}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 12,
          },
          legend: {
            display: true,
            position: "bottom",
          },

          // maintainAspectRatio: false,
        }}
      />
    );
  }
}

export default PieChart;
