import React from "react";
import { Grid, Form } from "semantic-ui-react";
import styled from "styled-components";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import Forms from "../../../Common/forms";
import { CButtons } from "../../../Common/buttons";
import Joi from "joi-browser";
import * as RegisterAdminService from "../../../../Service/RegisterAdminService";
import auth from "../../../../Service/authAdminService";
import Swal from "sweetalert2";

class AdminSignUp extends Forms {
  state = {
    data: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(4).label("Username"),
    firstname: Joi.string().required().label("Firstname"),
    lastname: Joi.string().required().label("Lastname"),
    email: Joi.string().required().email().label("E-mail"),
    password: Joi.string().required().min(8).label("Password"),
    phone: Joi.string().required().label("Phone"),
  };

  doSubmit = async () => {
    try {
      const response = await RegisterAdminService.adminRegister(
        this.state.data
      );
      Swal.fire({
        icon: "success",
        title: "Logging in Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      auth.loginWithJwt("username", response.headers);
      window.location = "/Dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        const errors = { ...this.state.errors };
        errors.phone = ex.response.data.error;
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
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Admin Sign Up</TitleWapper>
            <Grid>
              <Grid.Column mobile={4} tablet={4} computer={4}></Grid.Column>
              <StyleColumn mobile={8} tablet={8} computer={8}>
                <StyledForm onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "Username")}
                  {this.renderInput("firstname", "Firstname")}
                  {this.renderInput("lastname", "Lastname")}
                  {this.renderInput("email", "E-mail", "email")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderInput("phone", "Phone")}
                  <CButtons name="Register" color="#40a3dc" />
                </StyledForm>
              </StyleColumn>
            </Grid>
          </Grid.Column>
          <Grid.Column mobile={5} tablet={5} computer={5}></Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default AdminSignUp;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
