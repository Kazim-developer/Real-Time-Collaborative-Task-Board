import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Login />}></Route>),
);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
