import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import FullCard from "./components/FullCard/FullCard";
import SideBar from "./components/SideBar/SideBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: false,
      selectedPokemon: null,
      lastPokemonInfo: null,
    };
  }
  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=30&limit=30")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cards: result.results,
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

  togglesSideBar = () => {
    this.setState({ sideBar: !this.state.sideBar });
  };
  hideSideBar = () => {
    this.setState({ sideBar: false });
  };
  setPokemon = (name) => {
    this.setState({ selectedPokemon: name });
  };
  setLastPokemonInfo = (pokemonInfo) => {
    this.setState({ lastPokemonInfo: pokemonInfo });
  };
  render() {
    let { selectedPokemon } = this.state;
    return (
      <div className={this.state.sideBar ? "App noScroll" : "App"}>
        <BrowserRouter>
          <Header selectedPokemon={selectedPokemon} />
          <div className="App__main">
            <SideBar
              setPokemon={this.setPokemon}
              cards={this.state.cards}
              togglesSideBar={this.togglesSideBar}
              sideBar={this.state.sideBar}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  cards={this.state.cards}
                  setPokemon={this.setPokemon}
                  error={this.state.error}
                  hideSideBar={this.hideSideBar}
                  sideBar={this.state.sideBar}
                />
              </Route>
              <Route exact path="/pokemon/:name">
                <FullCard
                  setLastPokemonInfo={this.setLastPokemonInfo}
                  lastPokemonInfo={this.state.lastPokemonInfo}
                />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
