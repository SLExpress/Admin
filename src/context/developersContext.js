import React, { Component } from "react";
import {
  getDevelopers,
  deleteDeveloper,
  getScripts,
  approveScript,
  downloadScript,
  deleteScript,
  getTickets,
  viewInquiries,
  replyTickets,
} from "../Service/developerService";
import auth from "../Service/authAdminService";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DeveloperContext = React.createContext();

class DeveloperProvider extends Component {
  state = {
    developers: [],
    scripts: [],
    buyers: [],
    webSites: [],
    tickets: [],
    openTicket: "",
    inquiry: [],
    sortDevMsg: [],
    sortAdminMsg: [],
    sortAllMsg: [],
    currentPage: 1,
    pageSize: 5,
    loading: true,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount = async () => {
    try {
      if (auth.getCurrentAdmin()) {
        await this.developerList();
        await this.scriptList();
        await this.ticketsList();
      }
    } catch (ex) {}
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePreviousPageChange = (page) => {
    this.setState({ currentPage: page - 1 });
  };

  handleNextPageChange = (page) => {
    this.setState({ currentPage: page + 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  /**
   * Developer List
   */

  async developerList() {
    const { data: developers } = await getDevelopers();
    this.setState({ developers: developers.users, loading: false });
  }

  handleDeveloperDelete = async (developer) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          const developers = this.state.developers.filter(
            (d) => d._id !== developer._id
          );
          this.setState({ developers });

          try {
            await deleteDeveloper(developer._id);
          } catch (ex) {
            if (ex.response && ex.response.status === 404)
              toast.error("This site has already been deleted.");
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  /**
   * Scripts List
   */

  async scriptList() {
    const { data: scriptList } = await getScripts();

    var scr = scriptList.scripts.map((s) => {
      var dev = this.state.developers.filter((d) => d._id == s.developer);
      if (dev.length == 0) dev.firstName = "Not Found";
      else dev.firstName = dev[0].firstName;
      return {
        addedDate: s.addedDate,
        approved: s.approved,
        description: s.description,
        developer: dev.firstName,
        id: s.id,
        image: s.image,
        name: s.name,
        price: s.price,
        size: s.size,
      };
    });
    this.setState({ scripts: scr });
    const NewScripts = _.orderBy(this.state.scripts, ["addedDate"], ["desc"]);
    this.setState({ scripts: NewScripts, loading: false });
    // this.setState({ scripts: scr, loading: false });
    this.setState({ buyers: scriptList.scriptCustomers });
  }

  handleScriptDelete = async (developerSite) => {
    const scripts = this.state.scripts.filter(
      (ds) => ds._id !== developerSite._id
    );
    this.setState({ scripts });

    try {
      await deleteScript(developerSite._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This site has already been deleted.");
    }
  };

  handleApprovel = async (script) => {
    console.log("scriptid", script);
    try {
      await approveScript(script.id);
      this.scriptList();
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This site has already been deleted.");
    }
  };

  handleDownloadScripts = async (script) => {
    try {
      await downloadScript(script.id);
    } catch (ex) {}
  };

  handleWebsites = (customer) => {
    // console.log("gggcustomer", customer.websites);
    var webSites = customer.websites.map((w) => {
      const web = this.state.buyers.filter((b) => b.websiteId == w);
      console.log(" w.index", web);
      const webName = this.state.scripts.filter((s) => s.id == web[0].scriptId);
      return {
        id: web[0].websiteId,
        scriptId: web[0].scriptId,
        name: webName[0].name,
      };
    });
    this.setState({ webSites, loading: false });
    console.log("ggg", webSites);
  };

  /**
   * Developer Inquiries
   */

  async ticketsList() {
    const { data: ticketsList } = await getTickets();
    // console.log("ticketsList", ticketsList.tickets);
    // ticketsList.tickets.map((e) => console.log(e.userId.customerId));
    const tic = ticketsList.tickets.map((e) => this.renderDevTicket(e));
    // console.log("tic", tic);
    if (tic !== 0) {
      this.setState({ tickets: tic, loading: false });
    }
    const Tick = _.orderBy(this.state.tickets, ["time"], ["desc"]);
    this.setState({ tickets: Tick });
  }

  renderDevTicket = (tickets) => {
    if (tickets.userId.developerId) return tickets;
    else return 0;
  };

  handleInquiries = async (id, open) => {
    try {
      const { data: inquiries } = await viewInquiries(id);
      this.setState({ openTicket: open });
      this.setState({ inquiry: inquiries.ticket, loading: false });
      var DevMsg = _.orderBy(this.state.inquiry.userReplies, ["time"], ["asc"]);
      var AdminMsg = _.orderBy(
        this.state.inquiry.adminReplies,
        ["time"],
        ["asc"]
      );
      this.setState({ sortDevMsg: DevMsg });
      this.setState({ sortAdminMsg: AdminMsg });
      const dev = this.state.sortDevMsg;
      const admin = this.state.sortAdminMsg;

      const concatArr = [...dev, ...admin];
      console.log("concatArr", concatArr);
      var sortaMsg = _.orderBy(concatArr, ["replyId.time", "time"], ["asc"]);
      this.setState({ sortAllMsg: sortaMsg });
      auth.removeOpen();
      auth.setOpen(open);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This message has already been deleted.");
    }
  };

  handleReply = async (msg, id) => {
    try {
      const res = await replyTickets(msg, id);
      if (res.status === 200) await this.handleInquiries(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something Wrong..!");
    }
  };

  render() {
    console.log("webSites", this.state.webSites);
    //console.log("moment2", moment("2020-04-01T19:34:07.418Z").unix());
    console.log("buyersssss", this.state.buyers);
    return (
      <DeveloperContext.Provider
        value={{
          ...this.state,
          handlePageChange: this.handlePageChange,
          handlePreviousPageChange: this.handlePreviousPageChange,
          handleNextPageChange: this.handleNextPageChange,
          handleSort: this.handleSort,
          handleSearch: this.handleSearch,

          handleDeveloperDelete: this.handleDeveloperDelete,
          handleScriptDelete: this.handleScriptDelete,
          handleApprovel: this.handleApprovel,
          handleDownloadScripts: this.handleDownloadScripts,
          handleWebsites: this.handleWebsites,
          handleInquiries: this.handleInquiries,
          handleReply: this.handleReply,
        }}
      >
        {this.props.children}
      </DeveloperContext.Provider>
    );
  }
}

const DeveloperConsumer = DeveloperContext.Consumer;
export { DeveloperProvider, DeveloperConsumer, DeveloperContext };
