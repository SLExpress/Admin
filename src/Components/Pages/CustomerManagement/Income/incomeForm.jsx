import React, { Component } from "react";
import { Grid, Form } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import styled from "styled-components";
import { CButtons } from "./../../../Common/buttons";
import Forms from "./../../../Common/forms";
import { CustomerContext } from "../../../../context/customersContext";
import Joi from "joi-browser";
import Swal from "sweetalert2";

class IncomeForm extends Forms {
  static contextType = CustomerContext;
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
      await this.context.handleIncome(this.state.data);
      Swal.fire({
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1000,
      });

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/income";
    } catch (ex) {
      Swal.fire({
        icon: "error",
        title: "Invalide Input",
        showConfirmButton: false,
        timer: 1500,
      });
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.year = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <Grid>
            <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
            <StyleColumn mobile={12} tablet={12} computer={12}>
              <StyledForm onSubmit={this.handleSubmit}>
                {this.renderInput("month", "Month")}
                {this.renderInput("year", "Year")}

                <CButtons name="Check" color="#40a3dc" />
              </StyledForm>
            </StyleColumn>
          </Grid>
        </Grid.Column>
      </Grid.Column>
    );
  }
}
export default IncomeForm;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
