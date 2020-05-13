import React, { Component } from "react";
import { Grid, Divider, Segment, Item, Form, Icon } from "semantic-ui-react";
import ButtonGroup from "./buttonGroup";
//import UserListContainer from "../../../../Containers/UserList.container";
import styled from "styled-components";
import { TitleWapper } from "../../../Common/CommonStyle";
import { Buttons } from "../../../Common/buttons";
import { Link } from "react-router-dom";
import Items from "../../../Common/item";
import { CustomerContext } from "../../../../context/customersContext";

class UserDetails extends Component {
  static contextType = CustomerContext;
  render() {
    const { singleCustomer } = this.context;
    // console.log("location", details[0]);

    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        // style={{ background: "green" }}
      >
        <TitleWapper>User Details</TitleWapper>
        <ButtonGroup />
        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Items data={singleCustomer} header="Personal Details" />
              <Link to="User-List">
                <Buttons name="Back" color="#40a3dc" />
              </Link>
            </Grid.Column>
            <Grid.Column>dddd</Grid.Column>
          </Grid>

          <Divider vertical>And</Divider>
        </Segment>
      </Grid.Column>
    );
  }
}
export default UserDetails;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
