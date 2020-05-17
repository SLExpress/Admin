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
import { IButton } from "./../../../Common/icon";

class IncomeSummary extends Component {
  static contextType = CustomerContext;

  componentDidMount = () => {
    this.context.handleIncomeDetails(this.props.location.incomes);
  };

  render() {
    // const { singleIncome } = this.context;
    // const { incomes } = this.props;
    // console.log("income-location", income);
    return (
      <CustomerContext.Consumer>
        {(customerContext) => (
          <DeveloperContext.Consumer>
            {(developerContext) => {
              const { singlePurchase, singleIncome } = this.context;
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
                        <Grid.Column
                          mobile={1}
                          tablet={1}
                          computer={1}
                        ></Grid.Column>
                        <StyleColumn
                          mobile={14}
                          tablet={14}
                          computer={14}
                          style={{ marginBottom: "15rem" }}
                        >
                          <ButtonGroup
                            name1={"Personal Details"}
                            name2={"Payment Details"}
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
                                  <Grid.Column
                                    mobile={6}
                                    tablet={6}
                                    computer={6}
                                  >
                                    <Image
                                      src="https://react.semantic-ui.com/images/avatar/large/nan.jpg"
                                      size="small"
                                      circular
                                    />
                                  </Grid.Column>
                                </Grid>
                                <Items
                                  data={customerContext.singleIncome}
                                  header="Personal Details"
                                />
                                <Link to="income">
                                  <IButton name="angle double left" />
                                </Link>
                              </Grid.Column>
                              <Grid.Column>
                                <Items
                                  data={developerContext.singlePurchase}
                                  header="Purchase Reporty"
                                />
                              </Grid.Column>
                            </Grid>

                            <Divider vertical>And</Divider>
                          </Segment>
                        </StyleColumn>
                      </Grid>
                    </Grid.Column>
                  </StyleGrid>
                </Grid.Column>
              );
            }}
          </DeveloperContext.Consumer>
        )}
      </CustomerContext.Consumer>
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
