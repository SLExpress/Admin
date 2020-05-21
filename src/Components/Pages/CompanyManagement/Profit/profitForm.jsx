import React, { Component } from "react";
import { Grid, Form, Segment } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import styled from "styled-components";
import { CButtons } from "../../../Common/buttons";
import Forms from "../../../Common/forms";
import { DeveloperContext } from "../../../../context/developersContext";
import Joi from "joi-browser";
import Swal from "sweetalert2";

class ProfitForm extends Forms {
  static contextType = DeveloperContext;
  state = {
    data: { month: "", year: "" },
    errors: {},
  };

  schema = {
    month: Joi.number().required().min(1).label("Month"),
    year: Joi.number().required().min(4).label("Year"),
  };

  doSubmit = async () => {
    try {
      // const { data } = this.state;
      await this.context.handlePayment(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/payment";
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        const errors = { ...this.state.errors };
        errors.year = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Segment>
        <StyledForm onSubmit={this.handleSubmit}>
          <Grid>
            <Grid.Column
              mobile={7}
              tablet={7}
              computer={7}
              // style={{ background: "red" }}
            >
              {this.renderInput("month", "Month")}
            </Grid.Column>
            {/* </Grid>
        <Grid> */}
            <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
            <Grid.Column
              mobile={7}
              tablet={7}
              computer={7}
              // style={{ background: "green" }}
            >
              {this.renderInput("year", "Year")}
            </Grid.Column>
          </Grid>
          <br />
          <CButtons name="Check" color="#40a3dc" />
        </StyledForm>
      </Segment>
    );
  }
}
export default ProfitForm;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
