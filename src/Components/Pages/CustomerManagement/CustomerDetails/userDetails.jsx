import React from "react";
import { Grid, Divider, Segment, Image, Form, Input } from "semantic-ui-react";
import ButtonGroup from "./buttonGroup";
//import UserListContainer from "../../../../Containers/UserList.container";
import styled from "styled-components";
import { TitleWapper } from "../../../Common/CommonStyle";
import { Buttons } from "../../../Common/buttons";
import { Link } from "react-router-dom";

const UserDetails = () => {
  // const { details } = UserListContainer.useContainer();
  // console.log(details);
  return (
    <Grid.Column
      mobile={13}
      tablet={13}
      computer={13}
      // style={{ background: "green" }}
    >
      <TitleWapper>User Details</TitleWapper>
      <ButtonGroup />
      {/* <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Image
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              size="small"
              circular
              centered
              style={{ marginTop: "40px" }}
            />
            <StyledForm>
              <Form.Field inline>
                <label>First name</label>
                <Input value={details.customer.firstName} />
              </Form.Field>
              <Form.Field inline>
                <label>Last name</label>
                <Input value={details.customer.lastName} />
              </Form.Field>
              <Form.Field inline>
                <label>username</label>
                <Input value={details.customer.username} />
              </Form.Field>
              <Form.Field inline>
                <label>E-mail</label>
                <Input value={details.customer.email} />
              </Form.Field>
              <Form.Field inline>
                <label>Phone</label>
                <Input value={details.customer.phone} />
              </Form.Field>
              <Form.Field inline>
                <label>Type</label>
                <Input value={"Customer"} />
              </Form.Field>
            </StyledForm>
            <Link to="User-List">
              <Buttons name="Back" color="#40a3dc" />
            </Link>
          </Grid.Column>
          <Grid.Column>dddd</Grid.Column>
        </Grid>

        <Divider vertical>And</Divider>
      </Segment> */}
    </Grid.Column>
  );
};

export default UserDetails;

// const StyledForm = styled(Form)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin: 25px;
// `;
