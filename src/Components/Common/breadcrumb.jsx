import React from "react";
import { Grid, Breadcrumb } from "semantic-ui-react";
// import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <Grid style={{ background: "#e9ecef", margin: 0, padding: 0 }}>
      <Grid.Column
        mobile={16}
        tablet={16}
        computer={16}
        style={{
          background: "#e9ecef",
          color: "#6c757d",
          margin: 0,
          padding: 0
        }}
      >
        <Breadcrumb
        // style={{
        //   background: "red;"
        // }}
        >
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>Search</Breadcrumb.Section>
        </Breadcrumb>
      </Grid.Column>
    </Grid>
  );
};

export default Breadcrumbs;
