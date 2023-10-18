import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import NoMatch from "../NoMatch";
import Admin from "../admin/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
