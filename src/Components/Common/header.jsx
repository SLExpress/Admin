import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CompanyContext } from "../../../src/context/companyContext";

class Header extends Component {
  static contextType = CompanyContext;

  render() {
    const { getBreadcrumb1 } = this.context;
    const admin = this.props.admin;
    return (
      <Grid style={{ margin: 0, padding: 0 }}>
        <Grid.Column
          mobile={16}
          tablet={16}
          computer={16}
          style={{ margin: 0, padding: 0 }}
        >
          <HeaderWrapper>
            <div className="container-fluid">
              <div className="row">
                <div className="line">
                  <div className="container">
                    <div className="row ">
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <Phone id="phone-number">
                          <a
                            href="tel:077 714 5020"
                            style={{ color: "#fff", textDecoration: "none" }}
                          >
                            <i className="fa fa-phone" />
                            <span className="text-to-hidden no-wrap">
                              Call Us: 077 714 5020
                            </span>
                          </a>
                          <span id="middle-border">&nbsp;</span>
                          <a
                            href="mailto:admin@slexpress.lk"
                            style={{ color: "#fff", textDecoration: "none" }}
                          >
                            <i className="fa fa-envelope" />
                            <span className="text-to-hidden">
                              Email: admin@slexpress.lk
                            </span>
                          </a>
                        </Phone>
                      </div>
                      <div className="col-md-3 offset-md-3  col-sm-6 col-xs-6">
                        <div id="phone-number">
                          <i className="fa fa-lock" />
                          <span className="login-register">
                            {!admin && (
                              <>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/admin-sign-in"
                                  onClick={() =>
                                    getBreadcrumb1("admin sign in")
                                  }
                                >
                                  Login
                                </Link>
                              </>
                            )}
                            {admin && (
                              <>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/log-out"
                                  onClick={() => getBreadcrumb1("log out")}
                                >
                                  Log Out
                                </Link>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/admin-sign-up"
                                  onClick={() =>
                                    getBreadcrumb1("admin sign up")
                                  }
                                >
                                  / New Admin
                                </Link>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div>
                        <SLexpresslk className="logo-and-nav">
                          <h1 style={{ marginTop: "25px", fontSize: "45px" }}>
                            <center>
                              <Link
                                to="/"
                                style={{
                                  color: "#fff",
                                  textDecoration: "none",
                                }}
                              >
                                SLExpress
                              </Link>
                            </center>
                          </h1>
                        </SLexpresslk>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div id="nav-bar">
                        {admin && (
                          <>
                            <ul>
                              <li>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/"
                                >
                                  HOME
                                </Link>
                              </li>
                              <li>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/contact-us"
                                  onClick={() => getBreadcrumb1("contact us")}
                                >
                                  CONTACT US
                                </Link>
                              </li>
                              <li>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/about-us"
                                  onClick={() => getBreadcrumb1("about us")}
                                >
                                  ABOUT US
                                </Link>
                              </li>
                              <li>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/terms-of-services"
                                  onClick={() =>
                                    getBreadcrumb1("terms of services")
                                  }
                                >
                                  TERMS OF SERVICES
                                </Link>
                              </li>
                              <li>
                                <Link
                                  style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                  }}
                                  to="/admin-profile"
                                  onClick={() =>
                                    getBreadcrumb1("admin profile")
                                  }
                                >
                                  ADMIN PROFILE
                                </Link>
                              </li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HeaderWrapper>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Header;

const HeaderWrapper = styled.div`
  a {
    text-decoration: none;
  }

  color: white;
  .line {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 45px;
    display: flex;
    align-items: center;
  }

  i {
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);

    margin-right: 10px;
  }
  .login-register {
    color: #fff;
    text-decoration: none;
  }
  .logo-and-nav {
    /* height: 100px; */
    display: flex;
    align-items: center;
    text-decoration:none h2 {
      color: white;

      @media (max-width: 575px) {
        margin-top: -70px;
      }

      @media (max-width: 320px) {
        font-size: 1.6rem;
      }
    }
  }

  background-color: #2fa7d9;

  .login-register {
    color: #fff;
  }

  #phone-number {
    display: flex;
    height: 100%;
    align-items: center;

    @media (max-width: 578px) {
      float: right;
    }

    #middle-border {
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      height: 45px;
      margin-left: 20px;
      margin-right: 15px;
    }

    .no-wrap {
      white-space: nowrap;
    }

    .text-to-hidden {
      @media (max-width: 1000px) {
        display: none;
      }
    }
  }

  #nav-bar {
    min-height: 30px;

    margin-top: 40px;
    ul {
      display: flex;
      padding-left: 0;

      @media (max-width: 413px) {
        display: none;
      }

      li {
        display: inline;
        margin: auto;
        border-bottom: 2px solid transparent;
        padding: 5px 5px;
        transition: all 0.2s;
      }
      li:hover {
        border-bottom: 2px solid #acacac;
        color: #acacac;
        cursor: pointer;
      }
    }
  }
`;

const Phone = styled.div`
  z-index: 10;
  color: #fff;

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const SLexpresslk = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
  }
`;
