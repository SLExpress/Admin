import React from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper } from "./../../../Common/CommonStyle";
import styled from "styled-components";

const BusinessPlan = () => {
  return (
    <Grid.Column
      mobile={13}
      tablet={13}
      computer={13}
      style={{ background: "red" }}
    >
      <TitleWapper>Business Plan</TitleWapper>
      <StyleGrid
        mobile={13}
        tablet={13}
        computer={13}
        // style={{ background: "red" }}
      >
        sddsdsddsdsdsdsdsdsdsddsddsdssdsddsdsddsdsdsdsdsdsds
      </StyleGrid>
    </Grid.Column>
  );
};

export default BusinessPlan;

const StyleGrid = styled(Grid.Column)`
  background: green;
  border-top: 200;
`;
