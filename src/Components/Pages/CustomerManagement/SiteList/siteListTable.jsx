import React, { Component } from "react";
import Tables from "../../../Common/tables";
import { Status } from "../../../Common/icon";
import { DeveloperContext } from "../../../../context/developersContext";

class SiteListTable extends Component {
  // state = {
  //   site: [],
  // };
  static contextType = DeveloperContext;

  // renderDev() {
  // siteList = this.props.sites.map((site) => {
  //   var scr = this.context.scripts.filter(
  //     (script) => script.id == site.scriptId
  //   );
  //   if (scr.length == 0) scr.name = "Not Found";
  //   else scr.name = scr[0].name;
  //   return [
  //     { createdDate: site.createdDate },
  //     { customer: site.customer },
  //     { id: site.id },
  //     { paid: site.paid },
  //     { price: site.price },
  //     { scriptName:  this.context.scripts.filter(
  //       (script) => script.id == site.scriptId
  //     )},
  //     { customUrl: site.customUrl },
  //     { defaultUrl: site.defaultUrl },
  //   ];
  // });
  // return siteList;
  // console.log("dfdfdf", siteList);
  // this.setState({ site: siteList });
  // }

  columns = [
    { date: "createdDate", label: "Date" },
    { path: "customer", label: "Customer Name" },
    { id: "scriptId", label: "Site Name" },
    { path: "defaultUrl", label: "Url" },
    { path: "price", label: "Price" },
    {
      key: "button",
      label: "Paid",
      content: (site) => (
        <Status
          // onSubmit={() => this.props.onDelete(site)}
          name="Details"
          color="#40a3dc"
          liked={site.paid}
        />
      ),
    },

    // {
    //   key: "button",
    //   content: site => (
    //     <Buttons
    //       onSubmit={() => this.props.onDelete(site)}
    //       name="Delete"
    //       color="#e60000"
    //     />
    //   )
    // }
  ];

  render() {
    const { sites, onSort, sortColumn, currentPage } = this.props;
    const { scripts } = this.context;
    // console.log("dfdfdf", this.state.site);
    return (
      <Tables
        id={scripts}
        columns={this.columns}
        data={sites}
        currentPage={currentPage}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SiteListTable;
