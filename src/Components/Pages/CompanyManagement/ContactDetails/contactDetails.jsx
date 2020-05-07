import React from "react";
import { Grid, Form } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import Forms from "../../../Common/forms";
import { CompanyContext } from "../../../../context/companyContext";
import styled from "styled-components";
import Joi from "joi-browser";
import { CButtons } from "./../../../Common/buttons";
import { Loading } from "./../../../Common/icon";

class ContactDetails extends Forms {
  static contextType = CompanyContext;
  state = {
    data: {
      phone: "",
      address: "",
      branch1: "",
      branch2: "",
      branch3: "",
      opening: "",
      closing: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    phone: Joi.string().required().min(7).label("Phone"),
    address: Joi.string().required().label("Address"),
    branch1: Joi.string().label("Branch 1"),
    branch2: Joi.string().label("Branch 2"),
    branch3: Joi.string().label("Branch 3"),
    opening: Joi.string().required().label("Opening"),
    closing: Joi.string().required().label("Closing"),
    email: Joi.string().required().email().label("E-mail"),
  };

  componentDidMount = async () => {
    await this.context.ContactDetails();
    const text = this.context.details;
    this.setState({ data: this.mapToContactDetails(text), loading: false });
  };

  mapToContactDetails(text) {
    const details = {
      phone: text.phone,
      address: text.address,
      branch1: text.branch1,
      branch2: text.branch2,
      branch3: text.branch3,
      opening: text.opening,
      closing: text.closing,
      email: text.email,
    };
    return details;
  }

  doSubmit = async () => {
    console.log("doSubmit");
    this.context.handleContactDetailsUpdate(this.state.data);
  };

  render() {
    const { ContactDetails, loading } = this.context;
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
          <StyleGrid>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <TitleWapper>Contact Details</TitleWapper>
              <Grid>
                <Grid.Column mobile={4} tablet={4} computer={4}></Grid.Column>
                <StyleColumn mobile={8} tablet={8} computer={8}>
                  <StyledForm onSubmit={this.handleSubmit}>
                    {this.renderInput("phone", "Phone")}
                    {this.renderInput("address", "Address")}
                    {this.renderInput("branch1", "Branch 1")}
                    {this.renderInput("branch2", "Branch 2")}
                    {this.renderInput("branch3", "Branch 3")}
                    {this.renderInput("opening", "Opening")}
                    {this.renderInput("closing", "Closing")}
                    {this.renderInput("email", "E-mail", "email")}
                    <CButtons name="Update" color="#40a3dc" />
                  </StyledForm>
                </StyleColumn>
              </Grid>
            </Grid.Column>
          </StyleGrid>
        </Grid.Column>
      </>
    );
  }
}

export default ContactDetails;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
