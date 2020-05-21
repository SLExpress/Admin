import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class UsersLineChart extends Component {
  // constractor(props) {
  //   super(props);
  state = {
    data: {
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
          label: "Customers",
          backgroundColor: "rgba(255,0,255,0.75)",
          data: [4, 5, 1, 10, 32, 2, 12, 1, 10, 32, 2, 12],
        },
        {
          label: "Developers",
          backgroundColor: "rgba(0,255,0,0.75)",
          data: [0, 12, 21, 0, 12, 24, 2, 30, 15, 10, 20, 18],
        },
      ],
    },
  };
  // }

  setGradientColor = (canvas, color) => {
    // console.log("canvas", canvas);
    const ctx = canvas.getContext("2d");
    // console.log("ctx", ctx);
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, "rgba(133,255,144,0.85)");
    // console.log("gradient", gradient);
    return gradient;
  };

  getChartData = (canvas) => {
    const data = this.state.data;
    // console.log("DATA", data);
    if (data.datasets) {
      let colors = ["rgba(255,0,255,0.75)", "rgba(0,255,0,0.75)"];
      data.datasets.map((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth = 2;
      });
    }
    return data;
  };
  render() {
    return (
      <div style={{ position: "relative", width: 500, heigth: 650 }}>
        <Line options={{ responsive: true }} data={this.getChartData} />
      </div>
    );
  }
}

export default UsersLineChart;
