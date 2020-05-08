import React, { Component } from "react";
import { Menu, Icon, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getMenu } from "../../FakeDatabase/MenuBarData";
import styled from "styled-components";

class MenuBar extends Component {
  state = {
    MenuData: getMenu(),
    // activeItem: "dashboard",
  };

  // handleItemClick = (item) => this.setState({ activeItem: item });

  renderUrl = (item) => {
    const parts = item.split(" ");
    const combined = parts.join("-");
    return combined;
  };

  render() {
    // const { activeItem } = this.state;
    // console.log("activeItem", this.state.activeItem);

    return (
      <Grid.Column mobile={3} tablet={3} computer={3}>
        <Menu text pointing secondary vertical>
          {this.state.MenuData.map((menu) => (
            <Menu.Item key={menu.header}>
              <Menu.Header>{menu.header}</Menu.Header>

              <Menu.Menu>
                {menu.list.map((item) => (
                  <>
                    <Menu.Item key={item.name}>
                      <StyleMenuItem
                        to={"/" + this.renderUrl(item.name)}
                        // active={activeItem === item}
                        // onClick={() => this.handleItemClick(item)}
                      >
                        <Icon circular inverted color="teal" name={item.icon} />
                        {item.name}
                      </StyleMenuItem>
                    </Menu.Item>
                  </>
                ))}
              </Menu.Menu>
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
    );
  }
}
export default MenuBar;

const StyleMenuItem = styled(Link)`
  text-transform: capitalize;
  position: relative;
  display: block;
  padding-bottom: 1px;
  color: #8d949 !important;
  outline-width: 0;
  transition: all 0.3s ease-out;
  font-size: 15px;
  font-weight: 400;
`;
