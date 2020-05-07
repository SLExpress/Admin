import React from "react";
import { Grid, Button, Modal } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import Forms from "../../../Common/forms";
import { CompanyContext } from "../../../../context/companyContext";
import Cards from "../../../Common/cards";
import { Loading } from "./../../../Common/icon";

class TermsOfServices extends Forms {
  static contextType = CompanyContext;
  render() {
    const { ourToS, loading } = this.context;
    if (loading) {
      return <Loading />;
    }
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Terms of Services</TitleWapper>
            <Grid style={{ margin: "3rem" }}>
              <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
              <StyleColumn mobile={12} tablet={12} computer={12}>
                <Cards
                  header="Terms Of Services"
                  name="Update"
                  text={ourToS.text}
                  date={ourToS.updatedDate}
                />
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default TermsOfServices;
