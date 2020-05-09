import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

const Home = ({ admin }) => {
  return (
    <>
      {admin && (
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          style={{ animation: "fadeIn 1s ease-in" }}
        >
          <img src="./images/c2.jpg" />
        </Grid.Column>
      )}

      {!admin && (
        <Grid.Column
          mobile={13}
          tablet={13}
          computer={13}
          style={{ animation: "fadeIn 1s ease-in" }}
        >
          <img src="./images/c2.jpg" />
        </Grid.Column>
      )}
    </>
  );
};

export default Home;
