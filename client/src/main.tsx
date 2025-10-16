import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import AuthLayout from "./pages/layout/AuthLayout.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";
import ProjectPage from "./pages/projects/ProjectPage.tsx";
import ManageJobsPage from "./pages/manageJobs/ManageJobsPage.tsx";
import MyInvitationsPage from "./pages/myInvitations/MyInvitationsPage.tsx";

const root = document.getElementById("root") as HTMLElement;

const publicRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
];

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Toaster
      duration={2000}
      position="bottom-right"
    />
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicRoute>{element}</PublicRoute>}
        />
      ))}
      <Route element={<AuthLayout />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        <Route
          path="/projects"
          element={<ProjectPage />}
        />
        <Route path="/manage-jobs">
          <Route
            path=":projectId"
            element={<ManageJobsPage />}
          />
        </Route>
        <Route
          path="/my-invitations"
          element={<MyInvitationsPage />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
