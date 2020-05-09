import React, { Component } from "react";
import { Grid, Form } from "semantic-ui-react";
import styled from "styled-components";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "./../../../Common/CommonStyle";
import Forms from "../../../Common/forms";
import { CButtons } from "../../../Common/buttons";
import { CompanyContext } from "../../../../context/companyContext";
import Joi from "joi-browser";

class CategoryForm extends Forms {
  static contextType = CompanyContext;
  state = {
    data: {
      _id: "",
      name: "",
      title: "Add New Category",
    },
    // title: this.props.location.title,
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Category Name"),
  };

  componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId === "category-form") return;

    const category = this.context.singleCategory[0];
    if (!category) return this.props.history.replace("/category");

    this.setState({ data: this.mapToCategoryModel(category) });
  }

  mapToCategoryModel(category) {
    return {
      _id: category._id,
      name: category.name,
      title: "Update Category",
    };
  }

  doSubmit = async () => {
    console.log("doSubmit");
    await this.context.handleCategorySave(this.state.data);
    this.props.history.push("/category");
  };

  render() {
    const { open, size, close } = this.context;
    // console.log("Title", this.state.title);
    // console.log("param", this.props.match.params.id);
    return (
      <>
        <Grid.Column
          mobile={13}
          tablet={13}
          computer={13}
          style={{ animation: "fadeIn 1s ease-in" }}
        >
          <StyleGrid>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <TitleWapper>{this.state.data.title}</TitleWapper>
              <Grid>
                <Grid.Column mobile={4} tablet={4} computer={4}></Grid.Column>
                <StyleColumn mobile={8} tablet={8} computer={8}>
                  <StyledForm onSubmit={this.handleSubmit}>
                    {this.renderInput("name", "Category Name")}
                    <CButtons name="Submit" color="#40a3dc" />
                  </StyledForm>
                </StyleColumn>
              </Grid>
            </Grid.Column>
          </StyleGrid>
        </Grid.Column>
      </>
    );
  }
}

export default CategoryForm;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
