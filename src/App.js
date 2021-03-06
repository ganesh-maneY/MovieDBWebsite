import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import TV from "./pages/TV";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import TvDetails from "./pages/TvDetails";
import Search from "./pages/Search";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/movies" component={Movies} />
        <Route path="/tv-shows" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/tv/:id" component={TvDetails} />
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
      <Navbar />
    </main>
  );
};

export default App;
