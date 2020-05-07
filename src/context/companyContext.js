import React, { Component } from "react";
import auth from "../Service/authAdminService";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  getCategories,
  deleteCategory,
  saveCategory,
  getMission,
  updateMission,
  getVision,
  updateVision,
  getToS,
  updateToS,
  getContactDetails,
  updateContactDetails,
} from "./../Service/companyService";
import Swal from "sweetalert2";

const CompanyContext = React.createContext();

class CompanyProvider extends Component {
  state = {
    ourVision: [],
    ourMission: [],
    ourToS: [],
    details: [],
    categories: [],
    singleCategory: "",
    currentPage: 1,
    pageSize: 5,
    loading: true,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount = async () => {
    try {
      if (auth.getCurrentAdmin()) {
        await this.categoryList();
        await this.handleCategorySave();
        await this.Mission();
        await this.Vision();
        await this.ToS();
        await this.ContactDetails();
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
   * Categories
   */

  async categoryList() {
    const { data: categories } = await getCategories();
    this.setState({ categories: categories.categories, loading: false });
  }

  handleCategoryDelete = async (category) => {
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
          const categories = this.state.categories.filter(
            (c) => c._id !== category._id
          );
          this.setState({ categories });

          try {
            console.log(category._id);
            await deleteCategory(category._id);
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

    // const categories = this.state.categories.filter(
    //   (c) => c._id !== category._id
    // );
    // this.setState({ categories });

    // try {
    //   console.log(category._id);
    //   await deleteCategory(category._id);
    // } catch (ex) {
    //   if (ex.response && ex.response.status === 404)
    //     toast.error("This site has already been deleted.");
    // }
  };

  handleCategoryUpdate = (category, size) => {
    const singleCategory = this.state.categories.filter(
      (c) => c._id == category._id
    );
    this.setState({ singleCategory });
  };

  handleCategorySave = async (category) => {
    try {
      const res = await saveCategory(category);
      // Swal.fire({
      //   icon: "success",
      //   title: "Mission Update Sucessfully..!!",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      if (res.status === 200) await this.categoryList();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This category has already been deleted.");
    }
  };

  /**
   *
   * Company Details
   */

  Mission = async () => {
    const { data: Mission } = await getMission();
    this.setState({ ourMission: Mission, loading: false });
  };

  async handleMissionUpdate(data) {
    try {
      const res = await updateMission(data.text);
      Swal.fire({
        icon: "success",
        title: "Mission Update Sucessfully..!!",
        showConfirmButton: false,
        timer: 1500,
      });
      if (res.status === 200) await this.Mission();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something Wrong...!!");
    }
  }

  Vision = async () => {
    const { data: Vision } = await getVision();
    this.setState({ ourVision: Vision, loading: false });
  };

  async handleVisionUpdate(data) {
    try {
      const res = await updateVision(data.text);
      Swal.fire({
        icon: "success",
        title: "Vision Update Sucessfully..!!",
        showConfirmButton: false,
        timer: 1500,
      });
      if (res.status === 200) await this.Vision();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something Wrong...!!");
    }
  }

  ToS = async () => {
    const { data: ToS } = await getToS();
    this.setState({ ourToS: ToS, loading: false });
  };

  async handleTosUpdate(data) {
    try {
      const res = await updateToS(data.text);
      Swal.fire({
        icon: "success",
        title: "Terms of Services Update Sucessfully..!!",
        showConfirmButton: false,
        timer: 1500,
      });
      if (res.status === 200) await this.ToS();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something Wrong...!!");
    }
  }
  ContactDetails = async () => {
    const { data: contact } = await getContactDetails();
    var details = {
      opening: contact.details.hours.opening,
      closing: contact.details.hours.closing,
      branch1: contact.details.branches[0],
      branch2: contact.details.branches[1],
      branch3: contact.details.branches[2],
      email: contact.details.email,
      address: contact.details.address,
      phone: contact.details.phone,
    };
    this.setState({ details: details, loading: false });
  };

  async handleContactDetailsUpdate(data) {
    console.log("contexdata", data);
    try {
      const res = await updateContactDetails(data);
      Swal.fire({
        icon: "success",
        title: "Contact Details Update Sucessfully..!!",
        showConfirmButton: false,
        timer: 1500,
      });
      if (res.status === 200) await this.ContactDetails();
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Something Wrong...!!");
    }
  }

  render() {
    return (
      <CompanyContext.Provider
        value={{
          ...this.state,
          handlePageChange: this.handlePageChange,
          handlePreviousPageChange: this.handlePreviousPageChange,
          handleNextPageChange: this.handleNextPageChange,
          handleSort: this.handleSort,
          handleSearch: this.handleSearch,
          handleCategoryDelete: this.handleCategoryDelete,
          handleCategoryUpdate: this.handleCategoryUpdate,
          handleCategorySave: this.handleCategorySave,
          Mission: this.Mission,
          handleMissionUpdate: this.handleMissionUpdate,
          Vision: this.Vision,
          handleVisionUpdate: this.handleVisionUpdate,
          ToS: this.ToS,
          handleTosUpdate: this.handleTosUpdate,
          ContactDetails: this.ContactDetails,
          handleContactDetailsUpdate: this.handleContactDetailsUpdate,
        }}
      >
        {this.props.children}
      </CompanyContext.Provider>
    );
  }
}

const CompanyConsumer = CompanyContext.Consumer;
export { CompanyProvider, CompanyConsumer, CompanyContext };
