import React, { Component } from "react";
import { Inputs, Area } from "./inputs";
import Joi from "joi-browser";

class Forms extends Component {
  state = {
    data: {},
    errors: {},
    rows: "",
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("sumbit");

    this.doSubmit();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Inputs
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        group
        type={type}
        errors={errors[name]}
      />
    );
  }

  renderTextArea(name, lable, type = "text") {
    const { data, errors, rows } = this.state;

    return (
      <Area
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        group
        type={type}
        rows={rows}
        errors={errors[name]}
      />
    );
  }
}

export default Forms;
