import { Route, Routes } from "react-router-dom";
import "./App.css";
import Launch from "./routes/launch/launch.routes";
import Welcome from "./routes/welcome/welcome.routes";
import Header from "./components/header/header.component";
import Pricing from "./routes/pricing/pricing.routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Launch />} />
        <Route path="home" element={<Welcome />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
}

export default App;
