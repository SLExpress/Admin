import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper } from "../../../Common/CommonStyle";
import UsersLineChart from "./usersLineChart";
import IncomeBarChart from "./incomeBarChart";
import UsersPieChart from "./usersPieChart";
import PaymentBarChart from "./paymentBarChart";
import ProfitBarChart from "./profitBarChart";
import IncomePieChart from "./incomePieChart";

class Dashboard extends Component {
  render() {
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <TitleWapper>Dashboard</TitleWapper>
          <Grid>
            <Grid.Column mobile={7} tablet={7} computer={7}>
              <UsersLineChart />
            </Grid.Column>
            <Grid.Column mobile={1} tablet={1} computer={1}></Grid.Column>
            <Grid.Column mobile={7} tablet={7} computer={7}>
              <IncomeBarChart />
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column mobile={6} tablet={6} computer={6}>
              <IncomePieChart />
            </Grid.Column>
            <Grid.Column mobile={10} tablet={10} computer={10}>
              <ProfitBarChart />
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column mobile={10} tablet={10} computer={10}>
              <PaymentBarChart />
            </Grid.Column>

            <Grid.Column mobile={6} tablet={6} computer={6}>
              <UsersPieChart />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid.Column>
    );
  }
}

export default Dashboard;
