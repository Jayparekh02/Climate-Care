import { Modal } from "@mui/material";
import LoginForm from "../forms/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const navigate = useNavigate();

  // Close modal function
  const handleClose = () => {
    navigate("/"); // Go back to the previous route
  };

  return (
    <Modal
      open={true} // Modal is always open when this component is rendered
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <LoginForm handleClose={handleClose} />
    </Modal>
  );
};

export default LoginModal;
