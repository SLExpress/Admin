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
    const {
      breadcrumb1,
      breadcrumb2,
      getBreadcrumb1,
      getBreadcrumb2,
    } = this.context;
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
            <Link to={"/"} onClick={() => getBreadcrumb1("")}>
              <Breadcrumb.Section>Home</Breadcrumb.Section>
            </Link>
            {breadcrumb1 && <Breadcrumb.Divider />}
            <Breadcrumb.Section active style={{ textTransform: "capitalize" }}>
              <Link
                to={"/" + this.renderBreadcrumb(breadcrumb1)}
                onClick={() => getBreadcrumb1(breadcrumb1)}
              >
                {breadcrumb1}
              </Link>
            </Breadcrumb.Section>
            {breadcrumb2 && <Breadcrumb.Divider />}
            <Breadcrumb.Section active style={{ textTransform: "capitalize" }}>
              <Link
                to={"/" + this.renderBreadcrumb(breadcrumb2)}
                onClick={() => getBreadcrumb2(breadcrumb2)}
              >
                {breadcrumb2}
              </Link>
            </Breadcrumb.Section>
          </Breadcrumb>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Breadcrumbs;
