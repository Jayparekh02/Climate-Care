import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { RegistrationFormData } from "../../utils/types";
import { COUNTRY_CODES, radioInputs, textInputs } from "../../utils/constants";
import { formStyle } from "../../utils/commonStyles";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeSnackbar, registerUser } from "../../features/auth/registerSlice";
import { RootState } from "../../app/store";

interface Props {
  handleClose: () => void;
}

const RegistrationForm: React.FC<Props> = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, snackbarOpen, snackbarMessage, snackbarSeverity } =
    useAppSelector((state) => state.register);

  const [formData, setFormData] = useState<RegistrationFormData>({
    _id: "",
    name: "",
    email: "",
    password: "",
    countryCode: COUNTRY_CODES[0].value,
    phoneNumber: "",
    gender: "female",
    userType: "general",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectInput = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, countryCode: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(registerUser(formData));
    navigate("/login");
  };

  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => dispatch(closeSnackbar())}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={handleSubmit} sx={{ ...formStyle }}>
        <Container maxWidth="sm" disableGutters sx={{ position: "relative" }}>
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
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          {textInputs.map((input) => {
            return (
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
                // InputLabelProps={{
                //   shrink: input.name == "dateOfBirth" ? true : false,
                // }}
              />
            );
          })}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            {radioInputs.map((radioInput) => (
              <FormControl
                key={radioInput.id}
                component="fieldset"
                sx={{ display: "flex", flexDirection: "row", my: 3 }}
              >
                <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
                  {radioInput.label}
                </FormLabel>
                <RadioGroup
                  row
                  name={radioInput.name}
                  defaultValue={radioInput.defaultValue}
                  onChange={handleInputChange}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  {radioInput.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormControl sx={{ minWidth: 140, mt: 1 }}>
              <InputLabel id="country-code-label">Country Code</InputLabel>
              <Select
                labelId="country-code-label"
                id="country-code-select"
                value={formData.countryCode}
                label="Country Code"
                name="countryCode"
                onChange={handleSelectInput}
              >
                {COUNTRY_CODES.length &&
                  COUNTRY_CODES.map((code) => {
                    return (
                      <MenuItem key={code.id} value={code.value}>
                        {code.label}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              type="text"
              name="phoneNumber"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              margin="normal"
              fullWidth
            />
          </Box>

          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{
              color: "black",
              mt: 4,
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
            Register
          </Button>
          <Typography sx={{ mt: 2 }} variant="body1" gutterBottom>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default RegistrationForm;
