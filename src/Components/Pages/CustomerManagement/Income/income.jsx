import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import styled from "styled-components";
import IncomeForm from "./incomeForm";
import IncomeTable from "./incomeTable";

class Income extends Component {
  render() {
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid
        // style={{ overflowX: "scroll" }}
        >
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Income</TitleWapper>
            <Grid>
              <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
              <StyleColumn
                mobile={12}
                tablet={12}
                computer={12}
                style={{ marginBottom: "15rem" }}
              >
                <IncomeForm />
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default Income;
