import React, { Component } from "react";
import {
  getCustomers,
  deleteCustomer,
  getSites,
  deleteSite,
  getTickets,
  viewInquiries,
  replyTickets,
} from "../Service/customerService";
import auth from "../Service/authAdminService";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CustomerContext = React.createContext();

class CustomerProvider extends Component {
  state = {
    customers: [],
    singleCustomer: "",
    sites: [],
    tickets: [],
    inquiry: [],
    cusMsg: [],
    sortCusMsg: [],
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
        await this.customerList();
        await this.siteList();
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
   * Customer List
   */

  async customerList() {
    const { data: customers } = await getCustomers();
    this.setState({ customers: customers.users, loading: false });
  }

  handleCustomerDelete = async (customer) => {
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
          const customers = this.state.customers.filter(
            (d) => d._id !== customer._id
          );
          this.setState({ customers });
          try {
            await deleteCustomer(customer._id);
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
    // const customers = this.state.customers.filter(
    //   (d) => d._id !== customer._id
    // );
    // this.setState({ customers });

    // try {
    //   await deleteCustomer(customer._id);
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     toast.error("This site has already been deleted.");
    // }
  };

  handleCustomerDetails = (customer) => {
    const singleCustomer = this.state.customers.filter(
      (c) => c._id == customer._id
    );
    this.setState({ singleCustomer });
  };

  /**
   * Sites List
   */

  async siteList() {
    const { data: sites } = await getSites();
    this.setState({ sites: sites, loading: false });
  }

  handleSiteDelete = async (site) => {
    const sites = this.state.sites.filter((ds) => ds._id !== site._id);
    this.setState({ sites });

    try {
      await deleteSite(site._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This site has already been deleted.");
    }
  };

  /**
   * Customer Inquiries
   */

  async ticketsList() {
    const { data: ticketsList } = await getTickets();
    // console.log("ticketsList", ticketsList.tickets);
    const tic = ticketsList.tickets.map((e) => this.renderDevTicket(e));
    //console.log("tic", tic);
    if (tic !== 0) {
      this.setState({ tickets: tic, loading: false });
    }
    const Tick = _.orderBy(this.state.tickets, ["time"], ["desc"]);
    this.setState({ tickets: Tick });
  }

  renderDevTicket = (tickets) => {
    if (tickets.userId.customerId) return tickets;
    else return 0;
  };

  handleInquiries = async (id) => {
    try {
      const { data: inquiries } = await viewInquiries(id);
      this.setState({ inquiry: inquiries.ticket, loading: false });
      var userReplies = this.state.inquiry.userReplies.map((reply) => {
        return {
          userReply: reply.replyId.userReply,
          time: reply.replyId.time,
        };
      });

      this.setState({ cusMsg: userReplies });
      var CustMsg = _.orderBy(this.state.cusMsg, ["time"], ["asc"]);
      var AdminMsg = _.orderBy(
        this.state.inquiry.adminReplies,
        ["time"],
        ["asc"]
      );
      this.setState({ sortCusMsg: CustMsg });
      this.setState({ sortAdminMsg: AdminMsg });
      const dev = this.state.sortCusMsg;
      const admin = this.state.sortAdminMsg;

      const concatArr = [...dev, ...admin];
      console.log("concatArr", concatArr);
      var sortaMsg = _.orderBy(concatArr, ["replyId.time", "time"], ["asc"]);
      this.setState({ sortAllMsg: sortaMsg });
      this.setOpen(this.state.openTicket);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This message has already been deleted.");
    }
  };

  handleReply = async (msg, id) => {
    try {
      const res = await replyTickets(msg, id);
      if (res.status === 200) {
        await this.handleInquiries(id);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something Wrong..!");
    }
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          ...this.state,
          handlePageChange: this.handlePageChange,
          handlePreviousPageChange: this.handlePreviousPageChange,
          handleNextPageChange: this.handleNextPageChange,
          handleSort: this.handleSort,
          handleSearch: this.handleSearch,

          handleCustomerDelete: this.handleCustomerDelete,
          handleSiteDelete: this.handleSiteDelete,
          handleInquiries: this.handleInquiries,
          handleReply: this.handleReply,
          setOpen: this.setOpen,
          getOpen: this.getOpen,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

const CustomerConsumer = CustomerContext.Consumer;
export { CustomerProvider, CustomerConsumer, CustomerContext };
