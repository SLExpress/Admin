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
    purchases: [],
    tickets: [],
    inquiry: [],
    cusMsg: [],
    sortCusMsg: [],
    sortAdminMsg: [],
    sortAllMsg: [],
    income: [],
    singleIncome: "",
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
  };

  handleCustomerDetails = (customer) => {
    console.log("cus", customer);
    const single = this.state.customers.filter((c) => c._id == customer._id);
    if (single[0].businessUser) single[0].businessUser = "Yes";
    else single[0].businessUser = "No";
    if (single[0].confirmed) single[0].confirmed = "Confirmed";
    else single[0].confirmed = "Not Confirmed";

    const singleCustomer = {
      BusinessUser: single[0].businessUser,
      Confirmed: single[0].confirmed,
      Email: single[0].email,
      First_Name: single[0].firstName,
      Last_Name: single[0].lastName,
      Phone: single[0].phone,
      Username: single[0].username,
    };
    this.setState({ singleCustomer, loading: false });
  };

  handlePurchases = (customer) => {
    // console.log("customer", customer);
    var purchases = customer.websites.map((w) => {
      const pur = this.state.sites.filter((s) => s.id == w);
      if (pur.length == 0) {
        pur.createdDate = "Not Found";
        pur.customUrl = "Not Found";
        pur.customer = "Not Found";
        pur.defaultUrl = "Not Found";
        pur.id = w;
        pur.paid = "Not Found";
        pur.price = "Not Found";
        pur.scriptId = "Not Found";
      } else {
        pur.createdDate = pur[0].createdDate;
        pur.customUrl = pur[0].customUrl;
        pur.customer = pur[0].customer;
        pur.defaultUrl = pur[0].defaultUrl;
        pur.id = pur[0].id;
        pur.paid = pur[0].paid;
        pur.price = pur[0].price;
        pur.scriptId = pur[0].scriptId;
      }

      if (pur.paid) pur.paid = "Yes";
      else pur.paid = "No";
      console.log("pur", pur.createdDate);
      return {
        createdDate: pur.createdDate,
        customUrl: pur.customUrl,
        customer: pur.customer,
        defaultUrl: pur.defaultUrl,
        websiteId: pur.id,
        paid: pur.paid,
        price: pur.price,
        scriptId: pur.scriptId,
      };
    });
    this.setState({ purchases, loading: false });
    // console.log("Purchases", purchases);
  };

  /**
   * Sites List
   */

  async siteList() {
    const { data: sites } = await getSites();
    console.log("SITESS", sites);
    var siteList = sites.map((s) => {
      var cus = this.state.customers.filter((c) => c._id == s.customerId);
      // var web = this.state.sites.filter((w) => c._id == s.customerId);
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
      const { data: income } = await getEarnings(data);

      // console.log("INC", income);
      // console.log("ddd", Income[0].payments[0].payment.$numberDecimal);
      var payments = income.map((i) => {
        // console.log("INCMAP", i);
        var inc = this.state.customers.filter(
          (c) => c._id == i.payments[0].customerId
        );
        if (inc[0].businessUser) inc[0].businessUser = "Yes";
        else inc[0].businessUser = "No";
        if (inc[0].confirmed) inc[0].confirmed = "Confirmed";
        else inc[0].confirmed = "Not Confirmed";
        console.log("inc", inc[0]);
        if (inc.length == 0) {
          inc.customer = i.payments[0].customerId;
          inc.customerId = i.payments[0].customerId;
          inc.developerId = i.payments[0].developerId;
          inc.payment = i.payments[0].payment.$numberDecimal * 2 + ".00";
          inc.paymentDate = i.payments[0].paymentDate;
          inc.purchaseId = i.payments[0].purchaseId;
        } else {
          inc.customer = inc[0].firstName;
          inc.customerId = i.payments[0].customerId;
          inc.developerId = i.payments[0].developerId;
          inc.payment = i.payments[0].payment.$numberDecimal * 2 + ".00";
          inc.paymentDate = i.payments[0].paymentDate;
          inc.purchaseId = i.payments[0].purchaseId;
        }

        return {
          customer: inc.customer,
          customerId: inc.customerId,
          developerId: inc.developerId,
          payment: inc.payment,
          paymentDate: inc.paymentDate,
          purchaseId: inc.purchaseId,
        };
      });
      console.log("payments", payments);
      this.setState({ income: payments });
      const NewIncomes = _.orderBy(
        this.state.income,
        ["paymentDate"],
        ["desc"]
      );
      this.setState({ income: NewIncomes, loading: false });
      console.log("payments", this.state.income);

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

  handleIncomeDetails = async (data) => {
    // console.log("SUMMARY", data);
    var incomeDetails = this.state.customers.filter(
      (c) => c._id == data.customerId
    );
    console.log("incomeDetails", incomeDetails.businessUser);
    if (incomeDetails[0].businessUser) incomeDetails[0].businessUser = "Yes";
    else incomeDetails[0].businessUser = "No";

    if (incomeDetails[0].confirmed) incomeDetails[0].confirmed = "Yes";
    else incomeDetails[0].confirmed = "No";

    if (incomeDetails.length == 0) {
      incomeDetails.businessUser = "Not Found";
      incomeDetails.confirmed = "Not Found";
      incomeDetails.email = "Not Found";
      incomeDetails.firstName = incomeDetails.customerId;
      incomeDetails.lastName = "Not Found";
      incomeDetails.phone = "Not Found";
      incomeDetails.username = "Not Found";
    } else {
    }

    const singleIncome = {
      BusinessUser: incomeDetails[0].businessUser,
      Confirmed: incomeDetails[0].confirmed,
      Email: incomeDetails[0].email,
      First_Name: incomeDetails[0].firstName,
      Last_Name: incomeDetails[0].lastName,
      Phone: incomeDetails[0].phone,
      Username: incomeDetails[0].username,
    };

    this.setState({ singleIncome, loading: false });
    console.log("Singlencome", this.state.singleIncome);
  };

  render() {
    console.log("currentPage", this.state.singleIncome);
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
          handlePurchases: this.handlePurchases,
          handleInquiries: this.handleInquiries,
          handleReply: this.handleReply,
          handleIncome: this.handleIncome,
          handleIncomeDetails: this.handleIncomeDetails,
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
