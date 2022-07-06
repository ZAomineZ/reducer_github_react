import React from "react";
import { StoreContainer } from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Repositories from "./pages/Repositories/Repositories";

function App() {
  return (
    <Router>
      <StoreContainer>
        <Route exact path="/" component={Home} />
        <Route path="/user/:login" component={Repositories} />
      </StoreContainer>
    </Router>
  );
}

export default App;
