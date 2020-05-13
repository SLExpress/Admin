import React, { Component } from "react";
import { Grid, Item, Icon } from "semantic-ui-react";
import _ from "lodash";

class Items extends Component {
  render() {
    const { data, header } = this.props;
    const entries = Object.entries(data);

    return (
      <Item.Group>
        <Item>
          <Item.Content style={{ fontFamily: "Helvetica" }}>
            <Item.Header as="a">{header} </Item.Header>
            {entries.map((key) => (
              <Grid>
                <Grid.Column mobile={3} tablet={3} computer={3}>
                  <Item.Meta>{key[0]}</Item.Meta>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                  <Item.Meta style={{ color: "rgba(0,0,0,.4)" }}>
                    {key[1]}
                  </Item.Meta>
                </Grid.Column>
              </Grid>
            ))}
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default Items;
