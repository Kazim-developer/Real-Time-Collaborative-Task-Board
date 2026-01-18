import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/user/login" element={<Login />} />,
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <p>Home page</p>
          </ProtectedRoute>
        }
      />
      ,
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
