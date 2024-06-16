/* ROUTER */
import { createBrowserRouter } from "react-router-dom";

/* PAGES */
import LoginPage from "../pages/login";
import ViewerPage from "../pages/viewer";

/* VIEWER CONTAINERS */
import Home from "../containers/home";
import PotreeViewer from "../containers/viewers/potree";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "viewer",
    element: <ViewerPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "pointCloud",
        element: <PotreeViewer />,
      },
    ],
  },
]);

export default router;
