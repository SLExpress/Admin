import React, { Component } from "react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import _ from "lodash";
import { CompanyContext } from "../../../src/context/companyContext";

class Ticket extends Component {
  static contextType = CompanyContext;

  renderReplies = (user, admin) => {
    let count;
    count = user + admin;
    return count + " replies";
  };

  myFunction(ticket) {
    // this.props.onDetails(customer);
    this.props.handleInquiries(ticket._id, ticket.open);
    this.context.getBreadcrumb2(this.props.link);
  }

  render() {
    const { tickets, handleInquiries, link } = this.props;
    const { getBreadcrumb2 } = this.context;
    return (
      <>
        {tickets.map((ticket, index) => (
          <>
            {ticket.userId && (
              <Card fluid key={index}>
                <Card.Content>
                  <Card.Header>{ticket.title}</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label image="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                      <Feed.Content>
                        <Card.Meta>
                          {
                            <Moment fromNow ago>
                              {ticket.time}
                            </Moment>
                          }{" "}
                          ago
                        </Card.Meta>
                        <Feed.Summary>{ticket.ticketText}</Feed.Summary>
                        <Link
                          to={{
                            pathname: `/${link}/${ticket._id}`,
                            status: [ticket.open],
                          }}
                          onClick={() =>
                            // handleInquiries(ticket._id, ticket.open)
                            this.myFunction(ticket)
                          }
                        >
                          {this.renderReplies(
                            ticket.adminReplies.length,
                            ticket.userReplies.length
                          )}
                        </Link>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            )}
          </>
        ))}
      </>
    );
  }
}

export default Ticket;
