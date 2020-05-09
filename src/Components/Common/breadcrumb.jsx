import React, { Component } from "react";
import { Grid, Breadcrumb } from "semantic-ui-react";
import { CompanyContext } from "../../../src/context/companyContext";
import { Link } from "react-router-dom";

class Breadcrumbs extends Component {
  static contextType = CompanyContext;

  renderBreadcrumb(item) {
    const parts = item.split(" ");
    const combined = parts.join("-");
    return combined;
  }

  render() {
    const { breadcrumb, getBreadcrumb } = this.context;
    return (
      <Grid style={{ background: "#e9ecef", margin: 0, padding: 0 }}>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          style={{
            background: "#e9ecef",
            color: "#6c757d",
            margin: 0,
            padding: 0,
          }}
        >
          <Breadcrumb>
            <Link to={"/"} onClick={() => getBreadcrumb("")}>
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active style={{ textTransform: "capitalize" }}>
              <Link
                to={"/" + this.renderBreadcrumb(breadcrumb)}
                onClick={() => getBreadcrumb(breadcrumb)}
              >
                {breadcrumb}
              </Link>
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Breadcrumbs;
