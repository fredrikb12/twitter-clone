import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="/profiles/:userTag" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
