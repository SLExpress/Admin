import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper, StyleGrid } from "../../../Common/CommonStyle";
import { CustomerContext } from "../../../../context/customersContext";
import _ from "lodash";
import { Loading } from "./../../../Common/icon";
import Ticket from "./../../../Common/ticket";

class CustomerTickets extends Component {
  static contextType = CustomerContext;

  render() {
    const { tickets, loading, handleInquiries } = this.context;

    if (loading) {
      return <Loading />;
    }
    console.log("AllTickets", tickets);
    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Customer Tickets</TitleWapper>
            <Grid>
              <Grid.Column mobile={4} tablet={4} computer={4}></Grid.Column>
              <Grid.Column mobile={8} tablet={8} computer={8}>
                <Ticket
                  tickets={tickets}
                  handleInquiries={handleInquiries}
                  link="customer"
                />
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default CustomerTickets;
