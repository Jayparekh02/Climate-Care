import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import LoginModal from "./components/modals/LoginModal";
import RegistrationModal from "./components/modals/RegistrationModal";
import Root from "./pages/Root";
import EmissionStepper from "./pages/EmissionStepper";
import EmissionHistory from "./pages/EmissionHistory";
import { useAppSelector } from "./app/hooks";
import NgoEvents from "./pages/NgoEvents";
import GeneralEvents from "./pages/GeneralEvents";
import ResourcesPage from "./features/resources/ResourcesPage";

function App() {
  const { user } = useAppSelector((state) => state.login);

  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/register" element={<RegistrationModal />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/emission-calculator" element={<EmissionStepper />} />
        <Route path="/emission-history" element={<EmissionHistory />} />
        <Route
          path="/events"
          element={user?.userType === "ngo" ? <NgoEvents /> : <GeneralEvents />}
        />
        <Route path="/resources" element={<ResourcesPage />} />
      </Routes>
    </>
  );
}

export default App;
