import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterForm from "./components/RegisterForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth/user-register" element={<RegisterForm />} />,
      <Route path="/auth/user-login" element={<LoginForm />} />,
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <p>Home page</p>
          </ProtectedRoute>
        }
      />
      ,
      <Route path="*" element={<h1>No such page found</h1>} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
