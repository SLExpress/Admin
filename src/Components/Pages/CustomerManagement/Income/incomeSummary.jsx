import React, { Component } from "react";
import { Grid, Divider, Segment, Item, Form, Icon } from "semantic-ui-react";
// import ButtonGroup from "./buttonGroup";
import styled from "styled-components";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { Buttons, ButtonGroup } from "../../../Common/buttons";
import { Link } from "react-router-dom";
import Items from "../../../Common/item";
import { CustomerContext } from "../../../../context/customersContext";

class IncomeSummary extends Component {
  static contextType = CustomerContext;
  render() {
    // const { singleCustomer } = this.context;
    // const { incomes } = this.props;
    // console.log("income-location", income);
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Income Summary</TitleWapper>
            <Grid>
              <Grid.Column mobile={1} tablet={1} computer={1}></Grid.Column>
              <StyleColumn
                mobile={14}
                tablet={14}
                computer={14}
                style={{ marginBottom: "15rem" }}
              >
                <ButtonGroup
                  name1={"Personal Detais"}
                  name2={"Payment Detais"}
                />
                <Segment>
                  <Grid columns={2} relaxed="very">
                    <Grid.Column>
                      <Items
                        data={this.props.location.incomes}
                        header="Personal Details"
                      />
                      <Link to="User-List">
                        <Buttons name="Back" color="#40a3dc" />
                      </Link>
                    </Grid.Column>
                    <Grid.Column>{/* <CustomerPurchases /> */}</Grid.Column>
                  </Grid>

                  <Divider vertical>And</Divider>
                </Segment>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default IncomeSummary;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
