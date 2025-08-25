import React from "react";

function FormInput({ label, name, type, className, id }) {
  return (
    <div>
      <label htmlFor={id || name}>{label}</label>
      <br />
      <input type={type} name={name} id={id || name} className={className} />
      <br />
    </div>
  );
}

export default FormInput;
