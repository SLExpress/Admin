import React, { Component } from "react";
import { Card, Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import _ from "lodash";

class Ticket extends Component {
  renderReplies = (user, admin) => {
    let count;
    count = user + admin;
    return count + " replies";
  };

  render() {
    const { tickets, handleInquiries, link } = this.props;
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
                            pathname: `/${link}-inquiries/${ticket._id}`,
                            status: [ticket.open],
                          }}
                          onClick={() =>
                            handleInquiries(ticket._id, ticket.open)
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
