import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { StepperFormData } from "../utils/types";
import TransportationForm from "../components/stepper/TransportationForm";
import FoodDietForm from "../components/stepper/FoodDietForm";
import HomeEnergyForm from "../components/stepper/HomeEnergyForm";
import WasteRecyclingForm from "../components/stepper/WasteRecyclingForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import { calculateData } from "../features/emission/emissionSlice";

const steps = [
  "Transportation",
  "Food and Diet",
  "Home Energy",
  "Waste and Recycling",
];

const EmissionStepper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.login);
  const [activeStep, setActiveStep] = useState(0);
  const [emissionData, setEmissionData] = useState<StepperFormData>({
    transportation: {},
    foodDiet: {},
    homeEnergy: {},
    wasteRecycling: {},
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFinish = () => {
    dispatch(calculateData({ ...emissionData, userId: user?._id }));
    navigate("/emission-history");
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => {
    setActiveStep(0);
    setEmissionData({
      transportation: {},
      foodDiet: {},
      homeEnergy: {},
      wasteRecycling: {},
    });
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <TransportationForm
            emissionData={emissionData}
            setEmissionData={setEmissionData}
          />
        );
      case 1:
        return (
          <FoodDietForm
            emissionData={emissionData}
            setEmissionData={setEmissionData}
          />
        );
      case 2:
        return (
          <HomeEnergyForm
            emissionData={emissionData}
            setEmissionData={setEmissionData}
          />
        );
      case 3:
        return (
          <WasteRecyclingForm
            emissionData={emissionData}
            setEmissionData={setEmissionData}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
      }}
    >
      <EnergySavingsLeafIcon
        sx={{
          position: "absolute",
          fontSize: "50vw", // Adjust according to your preference
          zIndex: "-999",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgb(153, 204, 204,0.15)",
        }}
      />
      <Container>
        <Box
          pb={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Typography variant="h3" gutterBottom>
            Daily Carbon Emission Calculator
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{
              color: "black",
              fontSize: 16,
              borderColor: "black",
              "&:hover": {
                borderColor: "#99cccc",
                color: "#99cccc",
              },
            }}
            startIcon={<HistoryIcon />}
            onClick={() => navigate("/emission-history")}
          >
            Emission History
          </Button>
        </Box>
        <Divider />
        <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ mt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                onClick={
                  activeStep === steps.length - 1 ? handleFinish : handleNext
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Container>
    </Box>
  );
};

export default EmissionStepper;
