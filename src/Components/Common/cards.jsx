import React from "react";
import { Card, Feed, Form } from "semantic-ui-react";
import { CompanyContext } from "../../context/companyContext";
import styled from "styled-components";
import _ from "lodash";
import Moment from "react-moment";
import Forms from "./forms";
import Joi from "joi-browser";
import { Buttons } from "./buttons";

class Cards extends Forms {
  static contextType = CompanyContext;
  state = {
    data: { text: "" },
    errors: {},
    rows: 17,
  };

  schema = {
    text: Joi.string().required().min(8).label("text"),
  };

  componentDidMount = async () => {
    // await this.context.Tos();
    // await this.context.Mission();
    // await this.context.Vision();
    const text = this.props.text;
    this.setState({ data: this.mapToModel(text), loading: false });
  };

  mapToModel(text) {
    return {
      text: text,
    };
  }

  doSubmit = async () => {
    console.log("doSubmit");
    if (this.props.header == "Our Mission") {
      this.context.handleMissionUpdate(this.state.data);
    } else if (this.props.header == "Our Vision") {
      this.context.handleVisionUpdate(this.state.data);
    } else {
      this.context.handleTosUpdate(this.state.data);
    }
  };

  render() {
    console.log("Data", this.state.data);
    const { name, text, header, date } = this.props;
    const { Tos, Mission, Vision, loading } = this.context;
    return (
      <>
        <Card fluid style={{ boxShadow: "none" }}>
          <Card.Content>
            <Card.Header>{header}</Card.Header>
          </Card.Content>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
                <Form onSubmit={this.handleSubmit}>
                  {this.renderTextArea("text", " Text")}
                  <Card.Meta>
                    Last Update :{" "}
                    {
                      <Moment fromNow ago>
                        {date}
                      </Moment>
                    }{" "}
                    ago
                  </Card.Meta>
                  <center>
                    <Buttons name="Update" color="#40a3dc" />
                  </center>
                  <br />
                  <br />
                </Form>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Card>
      </>
    );
  }
}

export default Cards;

const StyledForm = styled(Form)``;
