import { Component } from "react";
import auth from "../../Service/authAdminService";

class LogOut extends Component {
  componentDidMount = () => {
    auth.adminLogOut();

    window.location = "/";
  };
  render() {
    return null;
  }
}
export default LogOut;
