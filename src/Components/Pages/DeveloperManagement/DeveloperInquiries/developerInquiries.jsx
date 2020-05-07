import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { DeveloperContext } from "../../../../context/developersContext";
import _ from "lodash";
import { Loading } from "./../../../Common/icon";
import Messagebox from "./../../../Common/messageBox";
import styled from "styled-components";

class DeveloperInquiries extends Component {
  static contextType = DeveloperContext;

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
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Developer Inquiries</TitleWapper>
            <Grid>
              <Grid.Column mobile={2} tablet={2} computer={2}></Grid.Column>
              <StyleColumn mobile={12} tablet={12} computer={12}>
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
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default DeveloperInquiries;
