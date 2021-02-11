import React from "react";
import "./Card.scss";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const propTypes = {};

const defaultProps = {};

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { url } = this.props;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            pokemonInfo: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    let isLoaded = this.state.isLoaded;
    const { name, setPokemon } = this.props;
    {
      if (this.state.isLoaded && !this.state.error) {
        const { pokemonInfo } = this.state;
        const { history } = this.props;
        return (
          <div
            className="card"
            onClick={() => {
              setPokemon(name);
              history.push(`/pokemon/${name}`);
            }}
          >
            <div className="card__img-cont">
              <img
                src={pokemonInfo.sprites.front_default}
                alt=""
                className="card__img"
              />
            </div>
            <div className="card__name">{name}</div>
          </div>
        );
      }
      return <div>Loading...</div>;
    }
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
// #endregion

export default withRouter(Card);
