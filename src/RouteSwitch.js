import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Homepage from "./components/Homepage";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
