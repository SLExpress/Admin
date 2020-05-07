import React from "react";
import { Grid, Segment, Form } from "semantic-ui-react";
import Joi from "joi-browser";
import auth from "../../../../Service/authAdminService";
import styled from "styled-components";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { CButtons } from "../../../Common/buttons";
import Forms from "../../../Common/forms";
import Swal from "sweetalert2";

class AdminSignIn extends Forms {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("E-mail"),
    password: Joi.string().required().min(8).label("Password"),
  };

  doSubmit = async () => {
    try {
      // const { data } = this.state;
      await auth.adminLogin(this.state.data);
      Swal.fire({
        icon: "success",
        title: "Logging in Successfully",
        showConfirmButton: false,
        timer: 1000,
      });

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/dashboard";
    } catch (ex) {
      Swal.fire({
        icon: "error",
        title: "Logging Error",
        showConfirmButton: false,
        timer: 1500,
      });
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <Grid.Column
        mobile={16}
        tablet={16}
        computer={16}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Admin Sign In</TitleWapper>
            <Grid>
              <Grid.Column mobile={5} tablet={5} computer={5}></Grid.Column>
              <StyleColumn
                mobile={6}
                tablet={6}
                computer={6}
                style={{ marginBottom: "15rem" }}
              >
                <StyledForm onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "E-mail", "email")}
                  {this.renderInput("password", "Password", "password")}
                  <CButtons name="Login" color="#40a3dc" />
                </StyledForm>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default AdminSignIn;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
