import React from "react";
import {
  FormGroup,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { StepperFormData } from "../../utils/types"; // This should be defined in your project

interface WasteRecyclingFormProps {
  emissionData: StepperFormData;
  setEmissionData: (
    updateFn: (prevData: StepperFormData) => StepperFormData
  ) => void;
}

const WasteRecyclingForm: React.FC<WasteRecyclingFormProps> = ({
  emissionData,
  setEmissionData,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type } = target;
    const updateValue = type === "checkbox" ? checked : value; // Use the `checked` from the second argument if available

    setEmissionData((prevData) => ({
      ...prevData,
      wasteRecycling: {
        ...prevData.wasteRecycling,
        [name]: updateValue,
      },
    }));
  };

  return (
    <FormGroup>
      <TextField
        label="Amount of Waste Generated per Week (kg)"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        name="weeklyWasteGeneratedKg"
        value={emissionData.wasteRecycling.weeklyWasteGeneratedKg || ""}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={emissionData.wasteRecycling.recyclesRegularly || false}
            name="recyclesRegularly"
            onChange={handleChange}
          />
        }
        label="Do you regularly recycle paper, plastic, glass, and metals?"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={emissionData.wasteRecycling.compostsOrganicWaste || false}
            name="compostsOrganicWaste"
            onChange={handleChange}
          />
        }
        label="Do you compost organic waste (food scraps, yard waste)?"
      />
    </FormGroup>
  );
};

export default WasteRecyclingForm;
