import React from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper } from "../../../Common/CommonStyle";
//import { SearchBar } from "../../../Common/icon";
//import dashboard from "../../../../Images/dasboard.jpg";

const Dashboard = () => {
  return (
    <Grid.Column
      mobile={13}
      tablet={13}
      computer={13}
      style={{ animation: "fadeIn 1s ease-in" }}
    >
      <TitleWapper>Dashboard</TitleWapper>
      <img src="./images/dashboard.jpg" />
      {/* <SearchBar /> */}
    </Grid.Column>
  );
};

export default Dashboard;
