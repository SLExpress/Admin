import React from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper, StyleGrid } from "../../../Common/CommonStyle";

const DomainList = () => {
  return (
    <Grid.Column
      mobile={13}
      tablet={13}
      computer={13}
      style={{ animation: "fadeIn 1s ease-in" }}
    >
      <StyleGrid>
        <Grid.Column mobile={16} tablet={16} computer={16}>
          <TitleWapper>Domain List</TitleWapper>
        </Grid.Column>
      </StyleGrid>
    </Grid.Column>
  );
};

export default DomainList;
