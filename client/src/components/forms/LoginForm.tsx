import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link as MLink,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formStyle } from "../../utils/commonStyles";
import { Link, useNavigate } from "react-router-dom";
import BackgroundFlow from "../BackgroundFlow";
import { LoginFormData } from "../../utils/types";
import { textInputs } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser, closeSnackbar } from "../../features/auth/loginSlice";

interface Props {
  handleClose: () => void;
}

const LoginForm: React.FC<Props> = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token, snackbarOpen, snackbarMessage, snackbarSeverity } =
    useAppSelector((state) => state.login);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (user && token) {
      // Assume token must be present along with user for successful login
      navigate("/"); // Navigate to home page after successful login
    }
  }, [user, token, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(loginUser(formData));
  };

  const handleSnackbarClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Box style={{ minHeight: "100vh" }}>
      <Container maxWidth="md" sx={formStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h3" fontWeight={100} sx={{ mb: 6 }}>
          Every Action Matters in Climate Care
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <BackgroundFlow />
          </Grid>
          <Grid item xs={12} md={6} component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            {textInputs.map(
              (input) =>
                (input.name === "email" || input.name === "password") && (
                  <TextField
                    required
                    name={input.name}
                    label={input.label}
                    key={input.id}
                    type={input.type}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="standard"
                  />
                )
            )}
            <Typography sx={{ mt: 2 }} variant="body1">
              <MLink component="strong">Forgot Password?</MLink>
            </Typography>
            <Button
              type="submit"
              variant="outlined"
              size="large"
              sx={{
                cursor: "pointer",
                color: "black",
                mt: 2,
                fontSize: 16,
                borderColor: "black",
                letterSpacing: 4,
                "&:hover": {
                  borderColor: "#99cccc",
                  color: "#99cccc",
                },
              }}
              fullWidth
            >
              Login
            </Button>
            <Typography sx={{ mt: 2 }} variant="body1" gutterBottom>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
