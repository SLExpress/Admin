import React from "react";
import { Grid } from "semantic-ui-react";
import { TitleWapper } from "../../../Common/CommonStyle";

const Sale = () => {
  return (
    <Grid.Column
      mobile={13}
      tablet={13}
      computer={13}
      // style={{ background: "#e9ecef;" }}
    >
      <TitleWapper>Sale</TitleWapper>
    </Grid.Column>
  );
};

export default Sale;
