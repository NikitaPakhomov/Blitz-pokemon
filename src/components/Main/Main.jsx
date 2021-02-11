import React from "react";
import PropTypes from "prop-types";
import "./Main.scss";
import Card from "./../Card/Card";
import SideBar from "./../SideBar/SideBar";
import Loader from "../Loader/Loader";

const propTypes = {};

const defaultProps = {};

class Main extends React.Component {
  render() {
    const { cards, sideBar, error, hideSideBar, setPokemon } = this.props;
    return error ? (
      <div>Не удалось загрузить данные: {error}</div>
    ) : (
      <div className="main">
        <div
          className={sideBar ? "main__info blur" : "main__info"}
          onClick={hideSideBar}
        >
          <h1 className="main__h">Покемоны</h1>
          <div
            className="main__cards-cont"
            onClick={() => (e) => {
              e.stopPropagation();
            }}
          >
            {cards
              ? cards.map((card) => (
                  <Card
                    url={card.url}
                    name={card.name}
                    setPokemon={setPokemon}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;
// #endregion

export default Main;
