import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import NoMatch from "../NoMatch";
import Admin from "../admin/Admin";
import RecipeDetail from "../home/RecipeDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="" element={<Home />}>
          <Route path=":recipeSlug" element={<RecipeDetail />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
