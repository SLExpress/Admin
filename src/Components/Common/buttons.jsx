import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

export const CButtons = ({ name, color, onSubmit }) => {
  return (
    <center>
      <ButtonStyle inverted color={color} onClick={onSubmit}>
        {name}
      </ButtonStyle>
    </center>
  );
};

export const Buttons = ({ name, color, onSubmit }) => {
  return (
    <ButtonWapper inverted color={color} onClick={onSubmit}>
      {name}
    </ButtonWapper>
  );
};

export const IButtons = ({ name, color, icon, onSubmit }) => {
  return (
    <Button
      style={{ marginBottom: "25px" }}
      // inverted
      content={name}
      color={color}
      onClick={onSubmit}
      icon={icon}
    />
  );
};

const ButtonStyle = styled.button`
  border-width: 2px;
  width: 6rem;
  background-color: transparent;
  border-style: solid;
  border-radius: 2rem;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: ${(props) => props.color};
  color: ${(props) => props.color};

  &:focus {
    outline: none;
  }

  &:hover {
    color: #fff;
    background-color: ${(props) => props.color};
  }
`;

const ButtonWapper = styled.button`
  border-width: 2px;
  width: 6rem;
  background-color: transparent;
  border-style: solid;
  border-radius: 2rem;
  padding: 6px;
  margin: 7px;
  justify-content: center;
  align-items: center;
  border-color: ${(props) => props.color};
  color: ${(props) => props.color};

  &:focus {
    outline: none;
  }

  &:hover {
    color: #fff;
    background-color: ${(props) => props.color};
  }
`;
