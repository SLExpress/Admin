import React, { Component } from "react";
import { Grid, ItemDescription, Loader } from "semantic-ui-react";
import {
  TitleWapper,
  StyleGrid,
  StyleColumn,
} from "../../../Common/CommonStyle";
import InputsBusiness from "../../../Common/inputsBusiness";

import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Segment,
} from "semantic-ui-react";
import { ErrorMessage } from "react-hook-form";
import Joi from "joi-browser";
import FormsBusiness from "../../../Common/formsBusiness";
import { adminQuestion } from "./../../../../Service/questionService";
import auth from "../../../../Service/authAdminService";
import { toast } from "react-toastify";

class QuestionsAdding extends FormsBusiness {
  state = {
    data: {
      title: "",
      total: "4",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().max(2000).label("Suggested Question"),
    total: Joi.string(),
    // answers: Joi.array()
    answer1: Joi.string().required().max(200).label("Answer1"),
    answer2: Joi.string().required().max(200).label("Answer2"),
    answer3: Joi.string().required().max(200).label("Answer3"),
    answer4: Joi.string().required().max(200).label("Answer4"),
  };

  // async componentDidMount() {
  //   const { data: data } = await axios.get(apiUrl + "/admin/addQuestion");
  //   this.setState({ data });
  // }

  // handleAdd = async () => {
  //   const obj = { title: "a", body: "b" };
  //   const { data: data } = await axios.post(apiUrl + "/admin/addQuestion", obj);
  // };

  doSubmit = async () => {
    //call the server
    try {
      const { data } = this.state;
      console.log(data);
      const answers = [data.answer1, data.answer2, data.answer3, data.answer4];
      console.log(answers);

      await adminQuestion(data.title, data.total, answers);
      console.log("submit");
      window.location = "/question-adding";
      toast.success("Submitted to the flow successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      // auth.loginWithJwt("username", response.headers);
      // window.location = "/AddQuestion";
    } catch (ex) {
      if (ex.response && ex.response.status === 422) {
        const errors = { ...this.state.errors };
        errors.phone = ex.response.data.error;
        this.setState({ errors });
      }
      toast.error("Error ocurred while submitting !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  render() {
    const { data, errors } = this.state;
    console.log(data);

    return (
      <Grid.Column
        mobile={13}
        tablet={13}
        computer={13}
        style={{ animation: "fadeIn 1s ease-in" }}
      >
        <StyleGrid>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <TitleWapper>Question Adding</TitleWapper>

            <Grid>
              <Grid.Column mobile={3} tablet={3} computer={3}></Grid.Column>
              <StyleColumn mobile={10} tablet={10} computer={10}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group widths="equal">
                    <Form.TextArea
                      fluid
                      autoFocus
                      id="title"
                      onChange={this.handleChange}
                      name="title"
                      value={data.title}
                      label="Suggested Question"
                      placeholder="Tell me any thing..."
                      error={errors.title}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      id="answer1"
                      onChange={this.handleChange}
                      value={data.answer1}
                      label="Answer1"
                      name="answer1"
                      placeholder="Answer One"
                      error={errors.answer1}
                    />
                    <Form.Input
                      fluid
                      id="answer2"
                      label="Answer2"
                      name="answer2"
                      placeholder="Answer Two"
                      onChange={this.handleChange}
                      value={data.answer2}
                      error={errors.answer2}
                    />
                    <Form.Input
                      fluid
                      id="answer3"
                      label="Answer3"
                      name="answer3"
                      placeholder="Answer Three"
                      onChange={this.handleChange}
                      value={data.answer3}
                      error={errors.answer3}
                    />
                    <Form.Input
                      fluid
                      id="answer4"
                      label="Answer4"
                      name="answer4"
                      placeholder="Answer Four"
                      onChange={this.handleChange}
                      value={data.answer4}
                      error={errors.answer4}
                    />
                  </Form.Group>
                  <br />
                  <br />
                  {this.renderButton("Add Question to the Flow")}
                </Form>
              </StyleColumn>
            </Grid>
          </Grid.Column>
        </StyleGrid>
      </Grid.Column>
    );
  }
}

export default QuestionsAdding;
