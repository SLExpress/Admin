import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/Pages/CompanyManagement/Home/home";
import Dashboard from "./Components/Pages/CompanyManagement/Dashboard/dashboard";
import CompanyDetails from "./Components/Pages/CompanyManagement/CompanyDetails/companyDetails";
//import CompanyDetailsForm from "./Components/Pages/CompanyManagement/CompanyDetails/comanyDetailsForm";
import ContactDetails from "./Components/Pages/CompanyManagement/ContactDetails/contactDetails";
import TermsOfServices from "./Components/Pages/CompanyManagement/TermsOfServices/termsOfServices";
import Category from "./Components/Pages/CompanyManagement/Category/category";
import CategoryForm from "./Components/Pages/CompanyManagement/Category/categoryForm";
import AdminSignIn from "./Components/Pages/CompanyManagement/AdminSignIn/adminSignIn";
import AdminSignUp from "./Components/Pages/CompanyManagement/AdminSignUp/adminSignUp";
import AdminProfile from "./Components/Pages/CompanyManagement/AdminProfile/adminProfile";
import UpdateAdminProfile from "./Components/Pages/CompanyManagement/AdminProfile/updateProfile";
import Profit from "./Components/Pages/CompanyManagement/Profit/profit";
import ProfitSummary from "./Components/Pages/CompanyManagement/Profit/profitSummary";

import CustomerList from "./Components/Pages/CustomerManagement/CustomerList/customerList";
import SiteList from "./Components/Pages/CustomerManagement/SiteList/siteList";
import DomainList from "./Components/Pages/CustomerManagement/DomainList/domainList";
import CustomerTickets from "./Components/Pages/CustomerManagement/CustomerInquiries/customerTickets";
import CustomerInquiries from "./Components/Pages/CustomerManagement/CustomerInquiries/customerInquiries";
import Income from "./Components/Pages/CustomerManagement/Income/income";
import IncomeSummary from "./Components/Pages/CustomerManagement/Income/incomeSummary";
import UserDetails from "./Components/Pages/CustomerManagement/CustomerDetails/userDetails";

import DeveloperList from "./Components/Pages/DeveloperManagement/DeveloperList/developerList";
import ScriptList from "./Components/Pages/DeveloperManagement/ScriptList/scriptList";
import Payments from "./Components/Pages/DeveloperManagement/Payments/payments";
import PaymentSummary from "./Components/Pages/DeveloperManagement/Payments/paymentSummary";
import DeveloperTickets from "./Components/Pages/DeveloperManagement/DeveloperInquiries/developerTickets";
import DeveloperInquiries from "./Components/Pages/DeveloperManagement/DeveloperInquiries/developerInquiries";
import DeveloperDetails from "./Components/Pages/DeveloperManagement/DeveloperDetails/developerDetails";

import BusinessUserList from "./Components/Pages/BusinessPlanManagement/BusinessUserList/businessUserList";
import QuestionsAdding from "./Components/Pages/BusinessPlanManagement/QuestionAdding/questionsAdding";
import QuestionList from "./Components/Pages/BusinessPlanManagement/QuestionList/questionList";
import LogOut from "./Components/Common/logOut";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/about-us" component={CompanyDetails} />
      <Route path="/Contact-us" component={ContactDetails} />
      <Route path="/category/:id" component={CategoryForm} />
      <Route path="/terms-of-services" component={TermsOfServices} />
      <Route path="/categories" component={Category} />
      <Route path="/admin-sign-in" component={AdminSignIn} />
      <Route path="/log-out" component={LogOut} />
      <Route path="/admin-sign-up" component={AdminSignUp} />
      <Route
        path="/admin-profile/update-admin-profile"
        component={UpdateAdminProfile}
      />
      <Route path="/admin-profile" component={AdminProfile} />
      <Route path="/profit" component={Profit} />
      <Route path="/profit-summary" component={ProfitSummary} />

      <Route path="/user-list" component={CustomerList} />
      <Route path="/site-list" component={SiteList} />
      <Route path="/domain-list" component={DomainList} />
      <Route path="/customer-tickets" component={CustomerTickets} />
      <Route path="/customer-inquiries/:id" component={CustomerInquiries} />
      <Route path="/income" component={Income} />
      <Route path="/income-summary" component={IncomeSummary} />
      <Route path="/user-details" component={UserDetails} />

      <Route path="/developer-list" component={DeveloperList} />
      <Route path="/script-list" component={ScriptList} />
      <Route path="/payments" component={Payments} />
      <Route path="/payment-summary" component={PaymentSummary} />
      <Route path="/developer-tickets" component={DeveloperTickets} />
      <Route path="/developer-inquiries/:id" component={DeveloperInquiries} />
      <Route path="/developer-details" component={DeveloperDetails} />

      <Route path="/business-user-list" component={BusinessUserList} />
      <Route path="/question-adding" component={QuestionsAdding} />
      <Route path="/question-list" component={QuestionList} />
    </Switch>
  );
};

export default Routes;
