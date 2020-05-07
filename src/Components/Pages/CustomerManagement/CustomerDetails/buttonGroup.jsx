import React from "react";
import { Button } from "semantic-ui-react";

const ButtonGroup = () => {
  return (
    <Button.Group color="teal" attached="top">
      <Button>Personal Details</Button>
      <Button>Payment Details</Button>;
    </Button.Group>
  );
};

export default ButtonGroup;
