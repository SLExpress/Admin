import React from "react";
import { Grid, Form } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrids,
  StyleColumn,
} from "../../../Common/CommonStyle";
import Forms from "../../../Common/forms";
import { CompanyContext } from "../../../../context/companyContext";
import styled from "styled-components";
import Joi from "joi-browser";
import { CButtons } from "./../../../Common/buttons";
import { Loading } from "./../../../Common/icon";

class UpdateAdminProfile extends Forms {
  static contextType = CompanyContext;
  state = {
    data: {
      email: "",
      firstName: "",
      lastname: "",
      phone: "",
      username: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("E-mail"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    phone: Joi.number().required().min(7).label("Phone"),
    username: Joi.string().required().min(4).label("Username"),
  };

  componentDidMount = async () => {
    // await this.context.admin;
    const admin = this.context.admin;

    this.setState({ data: this.mapToAdminDetails(admin), loading: false });
  };

  mapToAdminDetails(admin) {
    console.log("UPDATEADMIN", admin);
    const details = {
      email: admin.Email,
      firstName: admin.First_Name,
      lastName: admin.Last_Name,
      phone: admin.Phone,
      username: admin.Username,
    };
    return details;
  }

  doSubmit = async () => {
    console.log("doSubmit");
    this.context.handleAdminProfileUpdate(this.state.data);
    this.props.history.push("/admin-profile");
  };

  render() {
    const { admin, loading } = this.context;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <Grid.Column
          mobile={13}
          tablet={13}
          computer={13}
          style={{ animation: "fadeIn 1s ease-in" }}
        >
          <StyleGrids>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <TitleWapper>Update Admin Profile</TitleWapper>
              <Grid>
                <Grid.Column mobile={4} tablet={4} computer={4}></Grid.Column>
                <StyleColumn
                  mobile={8}
                  tablet={8}
                  computer={8}
                  style={{ marginBottom: "15rem" }}
                >
                  <StyledForm onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "E-mail", "email")}
                    {this.renderInput("firstName", "First Name")}
                    {this.renderInput("lastName", "Last Name")}
                    {this.renderInput("phone", "Phone")}
                    {this.renderInput("username", "Username")}
                    <CButtons name="Update" color="#40a3dc" />
                  </StyledForm>
                </StyleColumn>
              </Grid>
            </Grid.Column>
          </StyleGrids>
        </Grid.Column>
      </>
    );
  }
}

export default UpdateAdminProfile;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
