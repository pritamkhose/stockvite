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
import Calculators from "./pages/Calculators/Calculators";
import StockLinks from "./pages/StockLinks";
import StockLevel from "./pages/StockLevel";
import Watchlist from "./pages/Watchlist";
import Portfolio from "./pages/Portfolio";
import StockDetails from "./pages/StockDetails";
import MultipleTechChart from "./pages/MultipleTechChart";
import ChartTechDetails from "./pages/ChartTechDetails";

import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<Login />} />
      <Route path="calc" element={<Calculators />} />
      <Route path="links" element={<StockLinks />} />
      <Route path="level" element={<StockLevel />} />
      <Route path="watchlist" element={<Watchlist />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="details/:id" element={<StockDetails />} />
      <Route path="charts/:id" element={<MultipleTechChart />} />
      <Route path="charttech/:id" element={<ChartTechDetails />} />
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
