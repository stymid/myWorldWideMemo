import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <Router>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
