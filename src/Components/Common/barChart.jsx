import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends Component {
  state = {
    chartData: this.props.data,
  };

  render() {
    const title = this.props.title;
    return (
      <Bar
        data={this.state.chartData}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 12,
          },
          // legend: {
          //   display: true,
          //   position: "right",
          // },

          // maintainAspectRatio: false,
        }}
      />
    );
  }
}

export default BarChart;
