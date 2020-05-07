// import React, { Component } from "react";
// import { Button, Modal } from "semantic-ui-react";
// import Forms from "./forms";
// import { Grid, Segment, Form } from "semantic-ui-react";
// import Joi from "joi-browser";
// import auth from "./../../Service/authAdminService";
// import styled from "styled-components";
// import { CButtons } from "./buttons";

// class Modals extends Forms {
//   render() {
//     const {
//       open,
//       size,
//       close
//       //, onDelete, content, title
//     } = this.props;

//     return (
//       <center>
//         <Modal size={size} open={open} onClose={this.close}>
//           <Modal.Header>Delete Your Account</Modal.Header>
//           <Modal.Content>
//             <Segment>
//               <StyledForm onSubmit={this.handleSubmit}>
//                 {this.renderInput("email", "E-mail", "email")}
//                 {this.renderInput("password", "Password", "password")}
//                 <CButtons name="Login" color="#40a3dc" />
//               </StyledForm>
//             </Segment>
//           </Modal.Content>
//           <Modal.Actions>
//             <Button negative onClick={this.props.close}>
//               No
//             </Button>
//             <Button
//               positive
//               icon="checkmark"
//               labelPosition="right"
//               content="Yes"
//             />
//           </Modal.Actions>
//         </Modal>
//       </center>
//     );
//   }
// }

// export default Modals;

// const StyledForm = styled(Form)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin: 25px;
// `;
