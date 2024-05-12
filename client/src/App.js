import { Route, Routes } from "react-router-dom";
import "./App.css";
import Launch from "./routes/launch/launch.pages";
import Welcome from "./routes/welcome/welcome.pages";
import Header from "./components/header/header.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Launch />} />
        <Route path="home" element={<Welcome />} />
      </Route>
    </Routes>
  );
}

export default App;
