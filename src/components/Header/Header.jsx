import React from "react";
import "./Header.scss";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { selectedPokemon } = this.props;
    return (
      <header className="header">
        <nav className="header__nav">
          <NavLink className="header__a" to="/" exact activeClassName="active">
            Главная
          </NavLink>
          <NavLink
            className="header__a"
            to={`/pokemon/${selectedPokemon}`}
            activeClassName="active"
          >
            Покемон
          </NavLink>
        </nav>
      </header>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
// #endregion

export default Header;
