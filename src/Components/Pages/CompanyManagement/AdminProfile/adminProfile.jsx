import React, { Component } from "react";
import { Grid, Divider, Segment, Item, Form, Image } from "semantic-ui-react";
// import ButtonGroup from "./buttonGroup";
import styled from "styled-components";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import { Buttons, IButtons } from "../../../Common/buttons";
import { Link } from "react-router-dom";
import Items from "../../../Common/item";
import { CompanyContext } from "../../../../context/companyContext";
import { IButton } from "./../../../Common/icon";

class AdminProfile extends Component {
  static contextType = CompanyContext;
  render() {
    const { admin, handleAdminDelete } = this.context;
    // console.log("location", details[0]);

    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Admin Profile</TitleWapper>
            <Grid>
              <Grid.Column mobile={3} tablet={3} computer={3}></Grid.Column>
              <StyleColumn
                mobile={10}
                tablet={10}
                computer={10}
                style={{ marginBottom: "15rem" }}
              >
                {/* <ButtonGroup
                  name1={"Personal Detais"}
                  name2={"Payment Detais"}
                /> */}
                <Segment>
                  <Grid columns={1} relaxed="very">
                    <Grid.Column>
                      <Grid>
                        <Grid.Column
                          mobile={6}
                          tablet={6}
                          computer={6}
                        ></Grid.Column>
                        <Grid.Column mobile={4} tablet={4} computer={4}>
                          <Image
                            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
                            size="small"
                            circular
                          />
                        </Grid.Column>
                      </Grid>
                      <Grid>
                        <Grid.Column
                          mobile={4}
                          tablet={4}
                          computer={4}
                        ></Grid.Column>
                        <Grid.Column mobile={10} tablet={10} computer={10}>
                          <Items data={admin} header="Admin Details" />
                          {/* <Link to="User-List"> */}
                          <IButtons
                            name="Update"
                            color="blue"
                            icon="edit outline"
                          />
                          <IButtons
                            onSubmit={() => handleAdminDelete()}
                            name="Delete Account"
                            color="red"
                            icon="user delete"
                          />
                          {/* </Link> */}
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                    <Grid.Column>{/* <CustomerPurchases /> */}</Grid.Column>
                  </Grid>

                  {/* <Divider vertical>And</Divider> */}
                </Segment>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}
export default AdminProfile;
