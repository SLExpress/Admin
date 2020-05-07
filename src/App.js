import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Common/header";
import Footer from "./Components/Common/footer";
import Content from "./Components/Common/content";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Breadcrumbs from "./Components/Common/breadcrumb";
import auth from "../src/Service/authAdminService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const admin = auth.getCurrentAdmin();
    this.setState({ admin });
  }
  render() {
    return (
      <>
        <ToastContainer />
        <BrowserRouter>
          <ContentWrapper>
            <Header admin={this.state.admin} />
            <Breadcrumbs />
            <Content admin={this.state.admin} />
          </ContentWrapper>
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}
export default App;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 2.5rem);
`;
