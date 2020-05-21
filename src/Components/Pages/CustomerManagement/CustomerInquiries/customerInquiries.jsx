import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrids,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { CustomerContext } from "../../../../context/customersContext";
import _ from "lodash";
import { Loading } from "./../../../Common/icon";
import Messagebox from "../../../Common/messageBox";

class CustomerInquiries extends Component {
  static contextType = CustomerContext;

  render() {
    const { sortAllMsg, loading, handleInquiries, handleReply } = this.context;

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
        <StyleGrids>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Customer Inquiries</TitleWapper>
            <Grid>
              <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
              <StyleColumn
                mobile={12}
                tablet={12}
                computer={12}
                style={{ backgroundImage: ' url("./images/q12.jpg")' }}
              >
                <Messagebox
                  sortAllMsg={sortAllMsg}
                  id={this.props.match.params.id}
                  status={this.props.location.status}
                  inquiries={handleInquiries}
                  handleReply={handleReply}
                />
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrids>
      </Grid.Column>
    );
  }
}

export default CustomerInquiries;
