import React, { Component } from "react";
import { Grid, Divider, Segment, Item, Form, Image } from "semantic-ui-react";
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
import { DeveloperContext } from "../../../../context/developersContext";
import { IButton } from "../../../Common/icon";
import Payment from "./payments";

class PaymentSummary extends Component {
  static contextType = DeveloperContext;

  componentDidMount = () => {
    this.context.handlePaymentDetails(this.props.location.payments);
    // this.context.handleDeveloprtDetails(this.props.location.payments);
  };

  render() {
    const { singlePurchase, singlePayment } = this.context;
    console.log("singlePayment");
    // const { incomes } = this.props;
    console.log("income-location", this.props.location.payments);
    return (
      // <DeveloperContext.Consumer>
      //   {(customerContext) => (
      //     <CustomerContext.Consumer>
      //       {(developerContext) => {
      //         const { singlePurchase, singlePayment } = this.context;
      //         return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Payment Report</TitleWapper>
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
                      <Grid>
                        <Grid.Column
                          mobile={6}
                          tablet={6}
                          computer={6}
                        ></Grid.Column>
                        <Grid.Column mobile={6} tablet={6} computer={6}>
                          <Image
                            src="https://react.semantic-ui.com/images/avatar/large/justen.jpg"
                            size="small"
                            circular
                          />
                        </Grid.Column>
                      </Grid>
                      <Items data={singlePayment} header="Developer Details" />
                      <Link to="payments">
                        <IButton name="angle double left" />
                      </Link>
                    </Grid.Column>
                    <Grid.Column>
                      <Items data={singlePurchase} header="Purchase Summary" />
                    </Grid.Column>
                  </Grid>

                  <Divider vertical>And</Divider>
                </Segment>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
      //         );
      //       }}
      //     </CustomerContext.Consumer>
      //   )}
      // </DeveloperContext.Consumer>
    );
  }
}
export default PaymentSummary;
