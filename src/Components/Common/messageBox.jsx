import React from "react";
import Forms from "./forms";
import { Grid, Message, Icon, Form, Label, Card } from "semantic-ui-react";
import { StyledMessageUser, StyledMessageAdmin } from "./CommonStyle";
import { CButtons } from "./buttons";
import Moment from "react-moment";
import styled from "styled-components";
import Joi from "joi-browser";

class Messagebox extends Forms {
  state = {
    data: {
      _id: "",
      message: "",
    },
    open: [],
    errors: {},
    rows: 8,
  };

  schema = {
    message: Joi.string().required().min(4).label("Message"),
  };

  componentDidMount = async () => {
    const id = this.props.id;
    this.setState({ data: this.setId(id) });
    const open = this.props.status;
    this.setState({ open: this.setOpen(open), loading: false });
    await this.props.inquiries(id);
    this.setOpen(open);
  };

  setOpen(o) {
    return {
      open: o,
    };
  }

  setId(id) {
    return {
      _id: id,
    };
  }

  setOpen(open) {
    if (open !== undefined) {
      open = open[0];
      //   console.log("fff", open);

      if (open) {
        localStorage.removeItem("open");
        localStorage.setItem("open", "open");
      }
      if (!open) {
        localStorage.removeItem("open");
        localStorage.setItem("open", "close");
      }
    }
  }

  doSubmit = async () => {
    try {
      const AdminMsg = this.state.data;
      //   console.log("AdminMsg.message", AdminMsg._id);
      this.props.handleReply(AdminMsg.message, AdminMsg._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
      }
    }
  };
  render() {
    const { sortAllMsg } = this.props;
    //  console.log("data", this.state.data);
    return (
      <Card fluid style={{ boxShadow: "none" }}>
        <Card.Content style={{ overflowY: "scroll" }}>
          <div style={{ height: "20rem" }}>
            <br />
            <br />
            {sortAllMsg.map((d, index) => (
              <>
                {!d.adminReply && (
                  <>
                    <Grid key={index}>
                      <Grid.Column mobile={10} tablet={10} computer={10}>
                        <StyledMessageUser>
                          {d.userReply}
                          <Card.Meta style={{ textAlign: "right" }}>
                            {<Moment calendar>{d.time}</Moment>}
                          </Card.Meta>
                        </StyledMessageUser>
                      </Grid.Column>
                      <br />
                    </Grid>
                    <br />
                  </>
                )}

                {d.adminReply && (
                  <>
                    <Grid>
                      <Grid.Column
                        mobile={6}
                        tablet={6}
                        computer={6}
                      ></Grid.Column>
                      <Grid.Column mobile={10} tablet={10} computer={10}>
                        <Grid>
                          <Grid.Column mobile={16} tablet={16} computer={16}>
                            <StyledMessageAdmin>
                              {d.adminReply}
                              <Card.Meta style={{ textAlign: "right" }}>
                                {<Moment calendar>{d.time}</Moment>}
                              </Card.Meta>
                            </StyledMessageAdmin>
                          </Grid.Column>
                        </Grid>
                      </Grid.Column>
                    </Grid>

                    <br />
                  </>
                )}
              </>
            ))}
          </div>
        </Card.Content>
        {localStorage.open == "open" && (
          <Card.Content>
            <Grid>
              <Grid.Column mobile={16} tablet={16} computer={16}>
                <StyledForm onSubmit={this.handleSubmit}>
                  {this.renderTextArea("message", "Message")}
                  <br />
                  <CButtons name="Send" color="#40a3dc" />
                </StyledForm>
              </Grid.Column>
            </Grid>
          </Card.Content>
        )}
      </Card>
    );
  }
}

export default Messagebox;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;
