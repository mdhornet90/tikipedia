import { Outlet, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Home from "../Home";
import NoMatch from "../NoMatch";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
