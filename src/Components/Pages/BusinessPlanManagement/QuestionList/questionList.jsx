import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  TitleWapper,
  StyleColumn,
  StyledPara,
  StyleGrid,
} from "../../../Common/CommonStyle";

class QuestionList extends Component {
  render() {
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Qusetion List</TitleWapper>
            <Grid>
              <Grid.Column mobile={1} tablet={1} computer={1}></Grid.Column>
              <StyleColumn mobile={14} tablet={14} computer={14}>
                Code 1 methanata danna. Grid tika oyata oni widihata wenas
                karaganna.
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default QuestionList;
