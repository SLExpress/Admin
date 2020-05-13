import React, { Component } from "react";
import {
  getCustomers,
  deleteCustomer,
  getSites,
  //deleteSite,
  getTickets,
  viewInquiries,
  replyTickets,
  getEarnings,
} from "../Service/customerService";
import auth from "../Service/authAdminService";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Moment from "react-moment";

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
    income: [],
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
    const single = this.state.customers.filter((c) => c._id == customer._id);
    if (single[0].businessUser) single[0].businessUser = "Yes";
    else single[0].businessUser = "No";
    if (single[0].confirmed) single[0].confirmed = "Yes";
    else single[0].confirmed = "No";

    const singleCustomer = {
      businessUser: single[0].businessUser,
      confirmed: single[0].confirmed,
      email: single[0].email,
      firstName: single[0].firstName,
      lastName: single[0].lastName,
      phone: single[0].phone,
      username: single[0].username,
    };
    this.setState({ singleCustomer, loading: false });
  };

  /**
   * Sites List
   */

  async siteList() {
    const { data: sites } = await getSites();
    var siteList = sites.map((s) => {
      var cus = this.state.customers.filter((c) => c._id == s.customerId);
      if (cus.length == 0) cus.firstName = "Not Found";
      else cus.firstName = cus[0].firstName;
      return {
        createdDate: s.createdDate,
        // <Moment format="DD/MM/YYYY ">{s.createdDate}</Moment>,
        customer: cus.firstName,
        id: s.id,
        paid: s.paid,
        price: s.price,
        scriptId: s.scriptId,
        customUrl: s.url.customUrl,
        defaultUrl: s.url.defaultUrl,
      };
    });
    this.setState({ sites: siteList });
    // console.log("SITE", this.state.sites);
    const NewSiteList = _.orderBy(this.state.sites, ["createdDate"], ["desc"]);
    this.setState({ sites: NewSiteList, loading: false });
  }

  // handleSiteDelete = async (site) => {
  //   const sites = this.state.sites.filter((ds) => ds._id !== site._id);
  //   this.setState({ sites });

  //   try {
  //     await deleteSite(site._id);
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       toast.error("This site has already been deleted.");
  //   }
  // };

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

  handleIncome = async (data) => {
    console.log("Income data", data);
    try {
      const { data: Income } = await getEarnings(data);
      // console.log("INC", Income[0]);
      // console.log("ddd", Income[0].payments[0].payment.$numberDecimal);
      var payments = Income[0].payments.map((i) => {
        var inc = this.state.customers.filter((c) => c._id == i.customerId);
        if (inc.length == 0) inc.firstName = "Not Found";
        else inc.firstName = inc[0].firstName;
        console.log("paymentsfirstName", inc.firstName);

        return {
          customer: inc.firstName,
          developerId: i.developerId,
          payment: i.payment.$numberDecimal * 2 + ".00",
          paymentDate: i.paymentDate,
          purchaseId: i.purchaseId,
          // customUrl: i.url.customUrl,
          // defaultUrl: i.url.defaultUrl,
        };
      });
      this.setState({ income: payments });
      const NewIncomes = _.orderBy(
        this.state.income,
        ["paymentDate"],
        ["desc"]
      );
      this.setState({ income: NewIncomes, loading: false });
      // console.log("payments", this.state.income);

      Swal.fire({
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 422)
        this.setState({ income: [], loading: false });
      Swal.fire({
        icon: "error",
        title: "Invalide Input",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  render() {
    // console.log("singleCustomer", this.state.singleCustomer);
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
          handleCustomerDetails: this.handleCustomerDetails,
          handleInquiries: this.handleInquiries,
          handleReply: this.handleReply,
          handleIncome: this.handleIncome,
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
