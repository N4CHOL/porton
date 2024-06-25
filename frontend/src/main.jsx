//  Total edges (E): 4
//  Total nodes (N): 4
//  Cyclomatic complexity of the code is 2

//  IMPORTS
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./modules/error page/error-page";
import Login from './pages/login/login.jsx'
import WorkOrderAdmin from "./pages/workOrderPage/workOrderAdmin.jsx";
import Home from "./pages/home/Home.jsx";
import ProvidersAdmin from "./pages/ProvidersPage/ProvidersAdmin.jsx";
import ProvidersForm from "./pages/ProvidersPage/ProvidersForm/providersForm.jsx";
import UserAdmin from "./pages/usersPage/userAdmin.jsx";
import UsersForm from "./pages/usersPage/usersForm/usersForm.jsx";
import GraphicsAdmin from "./pages/graphics/graphicsAdmin.jsx";
import VisionAdmin from "./pages/vision/VisionAdmin.jsx";
import PrivateRoute from "./components/privateRoute/PrivateRoute.jsx";
import { AuthProvider } from "./utilities/context/AuthContext.jsx";
import WorkOrderForm from "./pages/workOrderPage/workOrderForm/WorkOrderForm.jsx";




//  Router definition
const router = createBrowserRouter([
  //  Main route "/" 
  {
    path: "/",
    element: (<PrivateRoute>
      <Root />
    </PrivateRoute>),
    error: <ErrorPage />,
    //  Child Route that leads to dashboard page
    children: [
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "work-order",
        element: (<PrivateRoute allowedTypes={'Administrador'}>
          <WorkOrderAdmin />
        </PrivateRoute>),
      },
      {
        path: "work-order/new",
        element: (<PrivateRoute allowedTypes={'Administrador'}>
          <WorkOrderForm />
        </PrivateRoute>),
      },
      {
        path: "calendar",
        element: <Home />,
      },
      {
        path: "template",
        element: <Home />,
      },
      {
        path: "data",
              
        element: <GraphicsAdmin />,
      },
      {
        path: "iris",
        element: <VisionAdmin />,
      },
      {
        path: "assets",
        element: <Home />,
      },
      {
        path: "providers",
        element: <ProvidersAdmin />,
      },
      {
        element: <ProvidersForm />,
        path: "providers/form/:id",

      },
      {
        path: "providers/new",
        element: <ProvidersForm />,
      },
      {
        path: "users",
        element: <UserAdmin />,
      },
      {
        element: <ProvidersForm />,
        path: "users/form/:id",

      },
      {
        path: "users/form",
        element: <UsersForm />,
      },

    ],
  },
  //  Child Route that leads to login page
  {
    path: "login",
    element: <Login />,
    error: <ErrorPage />,
  },

]);
// Render the RouterProvider component wrapped in React.StrictMode
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);