import React from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper } from "./../../../Common/CommonStyle";

const UserIdeasList = () => {
  return (
    <Grid.Column
      mobile={13}
      tablet={13}
      computer={13}
      // style={{ background: "#e9ecef;" }}
    >
      <TitleWapper>User Ideas List</TitleWapper>
    </Grid.Column>
  );
};

export default UserIdeasList;
