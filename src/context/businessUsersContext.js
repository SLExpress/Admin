import React, { Component } from "react";
import {
  getBusinessUsers,
  deleteBusinessUser,
} from "../Service/businessUserService";
import auth from "../Service/authAdminService";
import _ from "lodash";
import { toast } from "react-toastify";

const BusinessUserContext = React.createContext();

class BusinessUserProvider extends Component {
  state = {
    businessUsers: [],
    currentPage: 1,
    pageSize: 5,
    loading: true,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount = async () => {
    try {
      if (auth.getCurrentAdmin()) {
        await this.businessUserList();
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
   * Business User List
   */

  async businessUserList() {
    const { data: businessUsers } = await getBusinessUsers();
    console.log("hh", businessUsers.customers);
    this.setState({ businessUsers: businessUsers.customers, loading: false });
  }

  handleBusinessUserDelete = async (businessUser) => {
    const businessUsers = this.state.businessUsers.filter(
      (d) => d._id !== businessUser._id
    );
    this.setState({ businessUsers });

    try {
      await deleteBusinessUser(businessUser._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This business user has already been deleted.");
    }
  };

  render() {
    console.log("hh", this.state.businessUsers);
    return (
      <BusinessUserContext.Provider
        value={{
          ...this.state,
          handlePageChange: this.handlePageChange,
          handlePreviousPageChange: this.handlePreviousPageChange,
          handleNextPageChange: this.handleNextPageChange,
          handleSort: this.handleSort,
          handleSearch: this.handleSearch,

          handleBusinessUserDelete: this.handleBusinessUserDelete,
        }}
      >
        {this.props.children}
      </BusinessUserContext.Provider>
    );
  }
}

const BusinessUserConsumer = BusinessUserContext.Consumer;
export { BusinessUserProvider, BusinessUserConsumer, BusinessUserContext };
