import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { OwnerDashboard } from "./components/OwnerDashboard.jsx";
import OwnerLogin from "./components/OwnerLogin.jsx";
import RenterLogin from "./components/RenterLogin.jsx";
import RenterDashboard from "./components/RenterDashboard.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ownerDashboard" element={<OwnerDashboard />} />
        <Route path="/ownerLogin" element={<OwnerLogin />} />
        <Route path="/renterLogin" element={<RenterLogin />} />
        <Route path="/ownerDashboard" element={<OwnerDashboard />} />
        <Route path="/renterDashboard" element={<RenterDashboard />} />
      </Routes>
    </QueryClientProvider>
  </BrowserRouter>
);
