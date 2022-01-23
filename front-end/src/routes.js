import { Explore } from "./pages/Explore.jsx";
import { Home } from "./pages/Home.jsx";
import { GigDetails } from "./pages/GigDetails";
import { BecomeSeller } from "./pages/BecomeSeller";
import { UserProfile } from "./pages/UserProfile";

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
    path: "/profile/:userId",
    component: UserProfile,
  },
  {
    path: "/explore",
    component: Explore,
  },
  {
    path: "/becomeSeller",
    component: BecomeSeller,
  },
];

export default routes;
