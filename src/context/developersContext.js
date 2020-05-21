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
  getPayments,
  getPurchase,
} from "../Service/developerService";
import auth from "../Service/authAdminService";
import _ from "lodash";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Moment from "react-moment";

const DeveloperContext = React.createContext();

class DeveloperProvider extends Component {
  state = {
    developers: [],
    singleDeveloper: "",
    scripts: [],
    singleScript: [],
    buyers: [],
    // singleBuyers: [],
    webSites: [],
    tickets: [],
    openTicket: "",
    inquiry: [],
    divMsg: [],
    sortDevMsg: [],
    sortAdminMsg: [],
    sortAllMsg: [],
    singlePurchase: "",
    payments: [],
    singlePayment: "",
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

  handleDeveloperrDetails = (developer) => {
    console.log("developer", developer);
    const single = this.state.developers.filter((c) => c._id === developer._id);
    if (single[0].businessUser) single[0].businessUser = "Yes";
    else single[0].businessUser = "No";
    if (single[0].confirmed) single[0].confirmed = "Confirmed";
    else single[0].confirmed = "Not Confirmed";

    const singleDeveloper = {
      BusinessUser: single[0].businessUser,
      Confirmed: single[0].confirmed,
      Email: single[0].email,
      First_Name: single[0].firstName,
      Last_Name: single[0].lastName,
      Phone: single[0].phone,
      Username: single[0].username,
    };
    this.setState({ singleDeveloper, loading: false });
  };

  handleSells = (developer) => {
    var singleScript = this.state.scripts.filter(
      (s) => s.developerId === developer._id
    );
    // console.log("singleScript", singleScript);
    this.setState({ singleScript, loading: false });
  };

  /**
   * Scripts List
   */

  async scriptList() {
    const { data: scriptList } = await getScripts();
    console.log("scriptList", scriptList);
    var scr = scriptList.scripts.map((s) => {
      var dev = this.state.developers.filter((d) => d._id === s.developer);
      if (dev.length === 0) dev.firstName = "Not Found";
      else dev.firstName = dev[0].firstName;
      return {
        addedDate: s.addedDate,
        approved: s.approved,
        developerId: s.developer,
        description: s.description,
        developer: dev.firstName,
        id: s.id,
        image: s.image,
        name: s.name,
        price: s.price,
        size: (s.size / 1048576).toFixed(2) + "Mb",
      };
    });
    this.setState({ scripts: scr });
    const NewScripts = _.orderBy(this.state.scripts, ["addedDate"], ["desc"]);
    this.setState({ scripts: NewScripts, loading: false });
    // this.setState({ scripts: scr, loading: false });
    this.setState({ buyers: scriptList.scriptCustomers });
  }

  handleScriptDelete = async (developerSite) => {
    console.log("developerSite", developerSite);
    const scripts = this.state.scripts.filter(
      (ds) => ds.id !== developerSite.id
    );
    this.setState({ scripts });

    try {
      await deleteScript(developerSite.id);
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

      var userReplies = this.state.inquiry.userReplies.map((reply) => {
        return {
          userReply: reply.replyId.userReply,
          time: reply.replyId.time,
        };
      });
      this.setState({ divMsg: userReplies });

      var DevMsg = _.orderBy(this.state.divMsg, ["time"], ["asc"]);
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

  handlePurchase = async (data) => {
    try {
      const { data: purchase } = await getPurchase(data.purchaseId);
      console.log("data", purchase);

      // var webSites = customer.websites.map((w) => {
      const web = this.state.buyers.filter(
        (b) => b.websiteId == purchase.payhereOrder
      );
      // console.log(" payhereOrder", web);
      const webName = this.state.scripts.filter((s) => s.id == web[0].scriptId);
      console.log(" webName", webName[0].name);

      const singlePurchase = {
        Date: <Moment format="DD/MM/YYYY ">{purchase.date}</Moment>,
        Site_Name: webName[0].name,
        Developer: webName[0].developer,
        Description: webName[0].description,
        Payment_No: purchase.payherePayment,
        Amount: purchase.payment.amount.$numberDecimal,
      };
      this.setState({ singlePurchase, loading: false });
      // this.setState({ singleCustomer, loading: false });
    } catch (ex) {
      // if (ex.response && ex.response.status === 404)
      //   toast.error("Something Wrong..!");
    }
  };

  handlePayment = async (data) => {
    console.log("Income data", data);
    try {
      const { data: payment } = await getPayments(data);

      console.log("INC", payment);
      // console.log("ddd", Income[0].payments[0].payment.$numberDecimal);
      var payments = payment.map((p) => {
        // console.log("INCMAP", i);
        var pay = this.state.developers.filter(
          (c) => c._id == p.payments[0].developerId
        );
        console.log("inc", p);
        if (pay.length == 0) {
          pay.developer = "Not Found";
        } else {
          pay.developer = pay[0].firstName;
        }

        return {
          customerId: p.payments[0].customerId,
          developer: pay.developer,
          developerId: p.payments[0].developerId,
          payment: p.payments[0].payment.$numberDecimal + ".00",
          paymentDate: p.payments[0].paymentDate,
          purchaseId: p.payments[0].purchaseId,
        };
      });
      console.log("payments", payments);
      this.setState({ payments });
      const NewPayments = _.orderBy(
        this.state.payments,
        ["paymentDate"],
        ["desc"]
      );
      this.setState({ payments: NewPayments, loading: false });
      console.log("State-payments", this.state.payments);

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

  handlePaymentDetails = async (data) => {
    // console.log("SUMMARY", data);
    var paymentDetails = this.state.developers.filter(
      (d) => d._id == data.developerId
    );
    console.log("paymentDetails", paymentDetails.businessUser);
    if (paymentDetails[0].businessUser) paymentDetails[0].businessUser = "Yes";
    else paymentDetails[0].businessUser = "No";

    if (paymentDetails[0].confirmed) paymentDetails[0].confirmed = "Yes";
    else paymentDetails[0].confirmed = "No";

    if (paymentDetails.length == 0) {
      paymentDetails.businessUser = "Not Found";
      paymentDetails.confirmed = "Not Found";
      paymentDetails.email = "Not Found";
      paymentDetails.firstName = paymentDetails.developerId;
      paymentDetails.lastName = "Not Found";
      paymentDetails.phone = "Not Found";
      paymentDetails.username = "Not Found";
    }

    const singlePayment = {
      BusinessUser: paymentDetails[0].businessUser,
      Confirmed: paymentDetails[0].confirmed,
      Email: paymentDetails[0].email,
      First_Name: paymentDetails[0].firstName,
      Last_Name: paymentDetails[0].lastName,
      Phone: paymentDetails[0].phone,
      Username: paymentDetails[0].username,
    };

    this.setState({ singlePayment, loading: false });
    console.log("singlePayment", this.state.singlePayment);
  };

  // handleDeveloprtDetails = async (data) => {
  //   // console.log("SUMMARY", data);
  //   var devDetails = this.state.developers.filter(
  //     (d) => d._id == data.developerId
  //   );
  //   console.log("devDetails", devDetails.businessUser);
  //   if (devDetails[0].businessUser) devDetails[0].businessUser = "Yes";
  //   else devDetails[0].businessUser = "No";

  //   if (devDetails[0].confirmed) devDetails[0].confirmed = "confirmed";
  //   else devDetails[0].confirmed = "Not confirmed";

  //   if (devDetails.length == 0) {
  //     devDetails.businessUser = "Not Found";
  //     devDetails.confirmed = "Not Found";
  //     devDetails.email = "Not Found";
  //     devDetails.firstName = devDetails.customerId;
  //     devDetails.lastName = "Not Found";
  //     devDetails.phone = "Not Found";
  //     devDetails.username = "Not Found";
  //   } else {
  //   }

  //   const SingleDev = {
  //     BusinessUser: devDetails[0].businessUser,
  //     Confirmed: devDetails[0].confirmed,
  //     Email: devDetails[0].email,
  //     First_Name: devDetails[0].firstName,
  //     Last_Name: devDetails[0].lastName,
  //     Phone: devDetails[0].phone,
  //     Username: devDetails[0].username,
  //   };

  //   this.setState({ SingleDev, loading: false });
  //   console.log("SingleDev", this.state.SingleDev);
  // };

  render() {
    console.log("sortAllMsg", this.state.sortAllMsg);
    //console.log("moment2", moment("2020-04-01T19:34:07.418Z").unix());
    // console.log("state-SingleDev", this.state.SingleDev);
    console.log("state-scripts", this.state.scripts);
    console.log("state-buyers", this.state.buyers);

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
          handlePurchase: this.handlePurchase,
          handlePayment: this.handlePayment,
          handlePaymentDetails: this.handlePaymentDetails,
          handleDeveloperrDetails: this.handleDeveloperrDetails,
          handleSells: this.handleSells,
        }}
      >
        {this.props.children}
      </DeveloperContext.Provider>
    );
  }
}

const DeveloperConsumer = DeveloperContext.Consumer;
export { DeveloperProvider, DeveloperConsumer, DeveloperContext };
