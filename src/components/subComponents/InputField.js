import React from "react";
import "./../subComponents/styles/InputField.scss";

function InputField({ label, type, placeholder, name, value, onChange }) {
  const inp =
    name === "img" ? (
      <input
        type={type}
        className="form-control"
        onChange={(e) => onChange(name, e.target.files)}
        placeholder={placeholder}
        value={value}
      />
    ) : (
      <input
        type={type}
        className="form-control"
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        value={value}
      />
    );
  return (
    <div className="inputField form-group">
      <label>{label}</label>
      {inp}
    </div>
  );
}

export default InputField;
