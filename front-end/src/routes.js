import { Explore } from "./pages/Explore.jsx";
import { Home } from "./pages/Home.jsx";
import { GigDetails } from "./pages/GigDetails";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/explore/:gigId",
    component: GigDetails,
  },
  {
    path: "/explore",
    component: Explore,
  },
];

export default routes;
