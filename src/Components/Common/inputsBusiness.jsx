import React from "react";
const InputsBusiness = ({ name, label, value, error, onChange }) => {
  return (
    <div class="field">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder="Answer Two"
        onChange={onChange}
        value={value}
      />
      {error & <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default InputsBusiness;
