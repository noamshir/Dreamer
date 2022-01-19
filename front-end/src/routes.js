import { Explore } from "./pages/Explore.jsx";
import { Home } from "./pages/Home.jsx";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/explore",
    component: Explore,
  },
];

export default routes;
