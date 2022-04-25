import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function RouteSwitch() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="/profiles/:userTag" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
