import React from "react";
import { Grid } from "semantic-ui-react";
import MenuBar from "./menuBar";
import Routes from "../../Routes";

const Content = ({ admin }) => {
  return (
    <Grid style={{ margin: 0 }}>
      {admin && <MenuBar />}
      <Routes />
    </Grid>
  );
};

export default Content;
