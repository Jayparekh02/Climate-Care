import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../forms/RegistrationForm";

const RegistrationModal = () => {
  const navigate = useNavigate();

  // Close modal function
  const handleClose = () => {
    navigate("/"); // Go back to the previous route
  };

  return (
    <Modal
      open={true} // Modal is always open when this component is rendered
      onClose={handleClose}
      aria-labelledby="registration-modal-title"
      aria-describedby="registration-modal-description"
    >
      <RegistrationForm handleClose={handleClose} />
    </Modal>
  );
};

export default RegistrationModal;
