import React from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import { StepperFormData } from "../../utils/types"; // Ensure this matches your actual type structure

interface HomeEnergyFormProps {
  emissionData: StepperFormData;
  setEmissionData: (
    updateFn: (prevData: StepperFormData) => StepperFormData
  ) => void;
}

const HomeEnergyForm: React.FC<HomeEnergyFormProps> = ({
  emissionData,
  setEmissionData,
}) => {
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { value: unknown }
    >
  ) => {
    const { name, value, checked, type } = event.target as HTMLInputElement;
    const updateValue = type === "checkbox" ? checked : value;

    setEmissionData((prevData) => ({
      ...prevData,
      homeEnergy: {
        ...prevData.homeEnergy,
        [name]: updateValue,
      },
    }));
  };

  return (
    <FormGroup>
      <TextField
        label="Monthly kWh Usage"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        name="monthlyKwhUsage"
        value={emissionData.homeEnergy.monthlyKwhUsage || ""}
        onChange={handleInputChange}
      />
      <FormControl component="fieldset" sx={{ my: 2 }}>
        <FormLabel component="legend">Type of Heating/Cooling System</FormLabel>
        <RadioGroup
          row
          name="heatingCoolingType"
          value={emissionData.homeEnergy.heatingCoolingType || ""}
          onChange={handleInputChange}
        >
          <FormControlLabel
            value="Central"
            control={<Radio />}
            label="Central Air/Heat"
          />
          <FormControlLabel
            value="Window"
            control={<Radio />}
            label="Window Units"
          />
          <FormControlLabel value="None" control={<Radio />} label="None" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={emissionData.homeEnergy.usesRenewableEnergy || false}
            name="usesRenewableEnergy"
            onChange={handleInputChange}
          />
        }
        label="Do you use any renewable energy sources (e.g., solar, wind)?"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={emissionData.homeEnergy.appliancesEnergyEfficient || false}
            name="appliancesEnergyEfficient"
            onChange={handleInputChange}
          />
        }
        label="Are your major appliances (refrigerator, washer, etc.) energy efficient (Energy Star certified)?"
      />
    </FormGroup>
  );
};

export default HomeEnergyForm;
