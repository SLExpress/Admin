import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  state = {
    chartData: this.props.data,
  };

  render() {
    const title = this.props.title;
    return (
      <Line
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

export default LineChart;
