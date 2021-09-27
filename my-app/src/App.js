import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Category from "./Components/Category/Category";
import Products from "./Components/Products/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Category />
        <Route exact path="/" />
        <Route path="/product/:id" component={Products} />
      </BrowserRouter>
    </div>
  );
}

export default App;
