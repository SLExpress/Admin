import styled from "styled-components";
import { Message, Grid, Table } from "semantic-ui-react";

export const TitleWapper = styled.h1`
  font-weight: bolder;
  text-transform: capitalize;
  line-height: 1.2;
  box-sizing: border-box;
  margin: 5rem !important;
  margin-block-start: 0.67rem;
  margin-block-end: 0.67rem;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  display: block;
  font-size: 2.5rem;
  font-family: "Bree Serif", serif;
  color: #2a2a72;
  text-align: center !important;
  animation: fadeIn 1s ease-in !important;
`;

export const StyleColumn = styled(Grid.Column)`
  border: 1rem;
  padding-top: 3rem !important;
  padding-left: 5rem !important;
  padding-right: 5rem !important;
  padding-bottom: 2rem !important;
  background: white;
  color: black;
  font-family: sans-serif;
  border-radius: 25px;
`;

export const StyleGrid = styled(Grid)`
  background-image: url("./images/q12.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  padding: 0px !importamt;
`;

export const StyleGrids = styled(Grid)`
  background-image: url("../images/q12.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  padding: 0px !importamt;
`;

export const StyleTable = styled(Table)`
  margin: 25;
  background: white;
`;
export const StyledMessageUser = styled(Message)`
  padding: 10px 14px !important;
  background: #c3fdb8 !important;
  margin: 10px 30px !important;
  border-radius: 9px !important;
  position: relative !important;
  animation: fadeIn 1s ease-in !important;
  box-shadow: none !important;

  &:after {
    content: "" !important;
    position: absolute !important;
    top: 50% !important;
    width: 0 !important;
    height: 0 !important;
    border: 20px solid transparent !important;
    border-bottom: 0 !important;
    margin-top: -10px !important;
  }

  &:after {
    left: 0 !important;
    border-right-color: #c3fdb8 !important;
    border-left: 0 !important;
    margin-left: -20px !important;
  }
`;

export const StyledMessageAdmin = styled(Message)`
  padding: 10px 14px !important;
  background: #addfff !important;
  margin: 10px 30px !important;
  border-radius: 9px !important;
  position: relative !important;
  animation: fadeIn 1s ease-in !important;
  box-shadow: none !important;

  &:after {
    content: "" !important;
    position: absolute !important;
    top: 50% !important;
    width: 0 !important;
    height: 0 !important;
    border: 20px solid transparent !important;
    border-bottom: 0 !important;
    margin-top: -10px !important;
  }

  &:after {
    right: 0 !important;
    border-left-color: #addfff !important;
    border-right: 0 !important;
    margin-right: -20px !important;
  }
`;

export const StyledPara = styled.p`
  font-family: sans-serif;
`;
