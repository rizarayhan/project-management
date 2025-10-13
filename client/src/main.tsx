import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Toaster
      duration={2000}
      position="bottom-right"
    />
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="/signup"
        element={<SignUpPage />}
      />
      <Route
        path="/test"
        element={
          <>
            <h1>Halo ini test</h1>
          </>
        }
      />
    </Routes>
  </BrowserRouter>
);
