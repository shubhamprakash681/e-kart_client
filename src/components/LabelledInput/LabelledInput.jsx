import React from "react";
import { useSelector } from "react-redux";
import "./labelledInput.scss";

const LabelledInput = ({
  type,
  name,
  id,
  label,
  value,
  setValue,
  valueToBeCom = null,
}) => {
  const { uiTheme } = useSelector((state) => state.uiReducer);
  return (
    <>
      <div className={`labelled-input-wrapper ${uiTheme}`}>
        <label className={`labelled-inp-label ${uiTheme}`} htmlFor={id}>
          {label}
        </label>
        <input
          className={`labelled-inp ${uiTheme}`}
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={(e) => {
            if (id === "upper-range") {
              Number(e.target.value) >= Number(valueToBeCom) &&
                setValue(e.target.value);
            } else if (id === "lower-range") {
              Number(e.target.value) <= Number(valueToBeCom) &&
                setValue(e.target.value);
            } else {
              setValue(e.target.value);
            }
          }}
        />
      </div>
    </>
  );
};

export default LabelledInput;
