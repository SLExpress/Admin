// import React from "react";
// import Joi from "joi-browser";
// import Forms from "../../../Common/forms";
// import { getMovie, saveMovie } from "../../../../FakeDatabase/fakeMovieService";
// import { getGenres } from "../../../../FakeDatabase/fakeGenreService";
// import { Grid, Segment, Form } from "semantic-ui-react";
// import styled from "styled-components";
// import { TitleWapper } from "../../../Common/CommonStyle";
// import { CButtons } from "../../../Common/buttons";

// class PaymentForm extends Forms {
//   state = {
//     data: {
//       title: "",
//       genreId: "",
//       numberInStock: "",
//       dailyRentalRate: ""
//     },
//     genres: [],
//     errors: {}
//   };

//   schema = {
//     _id: Joi.string(),
//     title: Joi.string()
//       .required()
//       .label("Title"),
//     genreId: Joi.string()
//       .required()
//       .label("Genre"),
//     numberInStock: Joi.number()
//       .required()
//       .min(0)
//       .max(100)
//       .label("Number in Stock"),
//     dailyRentalRate: Joi.number()
//       .required()
//       .min(0)
//       .max(10)
//       .label("Daily Rental Rate")
//   };

//   componentDidMount() {
//     const movieId = this.props.match.params.id;
//     if (movieId === "newPayment") return;

//     const movie = getMovie(movieId);
//     //if (!movie) return this.props.history.replace("/not-found");
//     console.log("movie", movie);
//     this.setState({ data: this.mapToViewModel(movie) });
//   }

//   mapToViewModel(movie) {
//     return {
//       _id: movie._id,
//       title: movie.title,
//       genreId: movie.genre._id,
//       numberInStock: movie.numberInStock,
//       dailyRentalRate: movie.dailyRentalRate
//     };
//   }

//   doSubmit = () => {
//     saveMovie(this.state.data);

//     this.props.history.push("/Payment");
//   };

//   render() {
//     console.log("data", this.state.data);
//     return (
//       <Grid.Column mobile={13} tablet={13} computer={13}>
//         <Grid>
//           <Grid.Column mobile={4} tablet={4} computer={4}></Grid.Column>
//           <Grid.Column mobile={7} tablet={7} computer={7}>
//             <TitleWapper>Update Payment</TitleWapper>
//             <Segment>
//               <StyledForm onSubmit={this.handleSubmit}>
//                 {this.renderInput("title", "Title")}
//                 {this.renderInput("numberInStock", "Number in Stock", "number")}
//                 {this.renderInput("dailyRentalRate", "Rate")}
//                 <CButtons name="Register" color="#40a3dc" />
//               </StyledForm>
//             </Segment>
//           </Grid.Column>
//           <Grid.Column mobile={5} tablet={5} computer={5}></Grid.Column>
//         </Grid>
//       </Grid.Column>
//     );
//   }
// }

// export default PaymentForm;

// const StyledForm = styled(Form)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin: 25px;
// `;
