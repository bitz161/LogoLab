import { Route, Routes } from "react-router-dom";
import "./App.css";
import Launch from "./routes/launch/launch.routes";
import Welcome from "./routes/welcome/welcome.routes";
import Header from "./components/header/header.component";
import Pricing from "./routes/pricing/pricing.routes";
import Community from "./routes/community/community.routes";
import Logos from "./routes/logo/logo.routes";
import ImageMapEditor from "./components/Editor/imagemap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Launch />} />
        <Route path="home" element={<Welcome />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="community" element={<Community />} />
        <Route path="logo" element={<Logos />} />
        <Rout path="logoFull" element={<ImageMapEditor />} />
      </Route>
    </Routes>
  );
}

export default App;
