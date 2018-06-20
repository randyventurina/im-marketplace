import Pages from "layouts/Pages.jsx";
import RTL from "layouts/RTL.jsx";
import Dashboard from "layouts/Dashboard.jsx";
import LoginPageContainer from "views/Pages/LoginPageContainer";

var indexRoutes = [
  { path: "/rtl", name: "RTL", component: RTL },
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Dashboard }
];

export default indexRoutes;
