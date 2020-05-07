import React, { Component } from "react";
import {
  Button,
  Card,
  Feed,
  Header,
  Modal,
  Grid,
  Segment,
  Form,
} from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { CompanyContext } from "../../../../context/companyContext";
import Cards from "../../../Common/cards";
import styled from "styled-components";
import { Loading } from "./../../../Common/icon";

class CompanyDetails extends Component {
  static contextType = CompanyContext;
  // Our main aim is to develop in a constant manner and become a leading
  //performer in this competitive global marketplace. Fortunately, we have been able
  //to gather a crew of professionals that can shape and mold their collective experiences,
  //all of them posses outstanding talent that can help to accelerate your organization.

  // Our vision is to unleash the full potential of the amazing pool of the software engineers
  //in Sri Lanka  by providing world class outsourcing services.

  render() {
    const { ourVision, ourMission, loading } = this.context;
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
              <TitleWapper>Company Details</TitleWapper>
              <Grid style={{ margin: "3rem" }}>
                <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
                <StyleColumn mobile={12} tablet={12} computer={12}>
                  <Cards
                    header="Our Mission"
                    name="Update"
                    text={ourMission.text}
                    date={ourMission.updatedDate}
                  />
                </StyleColumn>
              </Grid>
              <Grid style={{ margin: "3rem" }}>
                <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
                <StyleColumn mobile={12} tablet={12} computer={12}>
                  <Cards
                    header="Our Vision"
                    name="Update"
                    text={ourVision.text}
                    date={ourVision.updatedDate}
                  />
                </StyleColumn>
              </Grid>
            </Grid.Column>
          </StyleGrid>
        </Grid.Column>
      </>
    );
  }
}

export default CompanyDetails;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
