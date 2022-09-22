import React from "react";

import "./App.css";
import ProductCardPlugin from "./component/ProductCardPlugin";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GoogleTrendPlugin from "./component/googleTrendPlugin";
import Bubble from "./component/charts/bubble";
import Radical from "./component/charts/Radical";
import Treemap from "./component/charts/Treemap";


function App() {
  return (
    <>
      {/* <GoogleTrendPlugin /> */}
      <BrowserRouter>
        <Routes>

          <Route index element={<ProductCardPlugin />} />
          <Route path="/googletrends" element={<GoogleTrendPlugin />} />
          <Route path="/bubble" element={<Bubble />} />
          <Route path="/radical" element={<Radical />} />
          <Route path="/treeMap" element={<Treemap />} />

        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
