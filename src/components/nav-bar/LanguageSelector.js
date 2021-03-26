import PropTypes from "prop-types";
import React, { useState } from "react";

const LanguageSelector = props => {
  const [toggle, setToggle] = useState(false);
  const [placeholder, setPlaceholder] = useState(props.placeholder);

  let counter = 0;
  let timer;
  return (
    <div
      className={props.containerClass}
      onMouseLeave={() => {
        timer = setTimeout(() => {
          setToggle(false);
        }, 300);
      }}
      onMouseEnter={()=>{
        clearTimeout(timer);
      }}
    >
      {props.label && 
      <label className="selector-label">{props.label}</label>
      }
      <div className="custom-selector">
        <input
          type="checkbox"
          id={props.selectorId}
          className="open-select-list"
          checked={toggle}
          onChange={event => {
            if (event.target.checked === true) {
              setToggle(true);
            } else {
              setToggle(false);
            }
          }}
        />
        <label className="placeholder pointer" htmlFor={props.selectorId} data-content={placeholder}>
        <span className={placeholder === 'EN' ? `flag-gb` : `flag-${placeholder.toLowerCase()}`}>&nbsp;</span> {placeholder}
        </label>
        <div className="select-menu">
          {props.options && (
            <ul className="select-options list-group">
              <li className="hidden">
                <input
                  type="radio"
                  value="reset"
                  name={props.name}
                  id={props.name + "_reset"}
                  className="custom-option"
                  onClick={() => {
                    setPlaceholder(props.placeholder);
                  }}
                />
              </li>
              {props.options.map((item, i) => {
                counter++;
                return (
                  <li key={i}>
                    <input
                      type="radio"
                      name={props.name}
                      id={props.name + "_" + counter}
                      value={item.value}
                      data-title={item.title}
                      className="custom-option"
                      defaultChecked={
                        props.selectedValue === item.value ? true : false
                      }
                      onChange={event => {
                        setPlaceholder(event.target.dataset.title);
                        props.change(event);
                        setToggle(false);
                      }}
                    />
                    <label
                      className="pointer"
                      htmlFor={props.name + "_" + counter}
                    >
                      <span className={item.title === 'EN' ? `flag-gb` : `flag-${item.title.toLowerCase()}`}>&nbsp;</span> {item.title}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
 
    </div>
  );
};

LanguageSelector.protoTypes = {
  containerClass: PropTypes.string,
  label: PropTypes.string,
  selectorId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.object.isRequired,
  name: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  change: PropTypes.func
};
export default LanguageSelector;
