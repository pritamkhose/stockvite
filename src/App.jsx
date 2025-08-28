import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={NotFound}
        onReset={() => {
          console.error("resetting the error boundary state");
        }}
      >
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
};

export default App;
