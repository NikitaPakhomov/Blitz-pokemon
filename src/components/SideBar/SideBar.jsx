import React from "react";
import PropTypes from "prop-types";
import "./SideBar.scss";
import { withRouter } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

const SideBar = (props) => {
  return (
    <div className={props.sideBar ? "sideBar active" : "sideBar"}>
      <div
        className={
          props.sideBar ? "sideBar__btn sideBar__btn_pressed" : "sideBar__btn"
        }
        onClick={props.togglesSideBar}
      ></div>
      {props && props.cards
        ? props.cards.map((card, id) => (
            <div
              className="sideBar__card"
              key={`bar${id}`}
              onClick={() => {
                props.setPokemon(card.name);
                props.history.push(`/pokemon/${card.name}`);
                props.togglesSideBar();
              }}
            >
              {card.name}
            </div>
          ))
        : ""}
    </div>
  );
};

SideBar.propTypes = propTypes;
SideBar.defaultProps = defaultProps;
// #endregion

export default withRouter(SideBar);
