import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./FullCard.scss";

const propTypes = {};

const defaultProps = {};

const FullCard = (props) => {
  const [state, setState] = useState("");
  const [currentImg, setCurrentImg] = useState(6);
  let name = props.match.params.name;
  const { setLastPokemonInfo } = props;
  useEffect(() => {
    !(props.lastPokemonInfo && name == props.lastPokemonInfo.name)
      ? fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log("обновил");
              setLastPokemonInfo(result);
              setState({
                isLoaded: true,
                cardInfo: result,
              });
            },
            (error) => {
              setState({
                isLoaded: true,
                error,
              });
            }
          )
      : setState({
          isLoaded: true,
          cardInfo: props.lastPokemonInfo,
        });
  }, [name]);

  const currentImgControll = (value) => {
    if (currentImg + value > 6) {
      setCurrentImg(0);
    } else if (currentImg + value < 0) {
      setCurrentImg(6);
    } else {
      setCurrentImg(currentImg + value);
    }
  };

  return state.cardInfo ? (
    <div className="fullCard">
      <h1 className="fullCard__h">I'm pokemon: {name}</h1>
      <div className="fullCard__maininfo">
        Тип:{" "}
        {state.cardInfo.types.map((type) => (
          <span>{type.type.name}</span>
        ))}
        <div>
          <p>Рост: {state.cardInfo.height}</p>
          <p>Вес: {state.cardInfo.weight}</p>
          <p>Опыт: {state.cardInfo.base_experience}</p>
        </div>
      </div>

      <div className="fullCard__info">
        Способности:{" "}
        {state.cardInfo.abilities.map((ability) => (
          <span>{ability.ability.name} </span>
        ))}
      </div>
      <div className="fullCard__gallery">
        <div className="fullCard__img-cont">
          <div
            className="fullCard__contoll fullCard__contoll-left"
            onClick={() => currentImgControll(2)}
          >
            &#5176;
          </div>
          <div
            className="fullCard__contoll fullCard__contoll-right"
            onClick={() => currentImgControll(-2)}
          >
            &#5176;
          </div>
          {Object.keys(state.cardInfo.sprites).map((name, id) => {
            return state.cardInfo.sprites[name] != null ? (
              <img
                className={
                  currentImg == id
                    ? "fullCard__img fullCard__img_active"
                    : "fullCard__img"
                }
                src={state.cardInfo.sprites[name]}
                alt=""
              />
            ) : (
              ""
            );
          })}
        </div>
      </div>

      <div className="fullCard__info">
        Характеристики:{" "}
        {state.cardInfo.stats.map((stats) => (
          <span>
            {stats.stat.name} : {stats.base_stat}{" "}
          </span>
        ))}
      </div>
    </div>
  ) : name !== "null" ? (
    <Loader />
  ) : (
    <h1>Вы не выбрали покемона!</h1>
  );
};

FullCard.propTypes = propTypes;
FullCard.defaultProps = defaultProps;
// #endregion

export default withRouter(FullCard);
