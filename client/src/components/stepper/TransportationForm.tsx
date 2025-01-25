import React from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { StepperFormData } from "../../utils/types"; // assuming this is defined correctly in your project

interface TransportationFormProps {
  emissionData: StepperFormData;
  setEmissionData: (
    updateFn: (prevData: StepperFormData) => StepperFormData
  ) => void;
}

const TransportationForm: React.FC<TransportationFormProps> = ({
  emissionData,
  setEmissionData,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { value: unknown }
    >
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    const updateValue = type === "checkbox" ? checked : value;

    setEmissionData((prevData) => ({
      ...prevData,
      transportation: {
        ...prevData.transportation,
        [name]: updateValue,
      },
    }));
  };

  return (
    <FormGroup>
      <TextField
        label="Distance Traveled Daily (miles)"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        name="distanceTraveledDaily"
        value={emissionData.transportation.distanceTraveledDaily || ""}
        onChange={handleChange}
      />

      <FormControl component="fieldset" sx={{ my: 3 }}>
        <FormLabel component="legend">Transportation Type</FormLabel>
        <RadioGroup
          row
          name="transportType"
          value={emissionData.transportation.transportType || ""}
          onChange={handleChange}
        >
          <FormControlLabel value="Public" control={<Radio />} label="Public" />
          <FormControlLabel
            value="Private"
            control={<Radio />}
            label="Private"
          />
        </RadioGroup>
      </FormControl>

      {emissionData.transportation.transportType === "Private" && (
        <FormControl component="fieldset" sx={{ my: 2 }}>
          <FormLabel component="legend">Vehicle Type</FormLabel>
          <RadioGroup
            row
            name="vehicleType"
            value={emissionData.transportation.vehicleType || "Gas"}
            onChange={handleChange}
          >
            <FormControlLabel value="Gas" control={<Radio />} label="Gas" />
            <FormControlLabel
              value="Electric"
              control={<Radio />}
              label="Electric"
            />
          </RadioGroup>
        </FormControl>
      )}

      <FormControl
        component="fieldset"
        sx={{
          my: emissionData.transportation.transportType === "Private" ? 2 : 0,
        }}
      >
        <FormLabel component="legend">Carpooling Habits</FormLabel>
        <RadioGroup
          row
          name="carpooling"
          value={emissionData.transportation.carpooling || "driveAlone"}
          onChange={handleChange}
        >
          <FormControlLabel
            value="driveAlone"
            control={<Radio />}
            label="Drive Alone"
          />
          <FormControlLabel
            value="carpool"
            control={<Radio />}
            label="Carpool"
          />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="telecommute-frequency-label">
          Telecommuting Frequency
        </InputLabel>
        <Select
          labelId="telecommute-frequency-label"
          id="telecommute-frequency"
          name="telecommutingFrequency"
          value={emissionData.transportation.telecommutingFrequency || ""}
          label="Telecommuting Frequency"
          onChange={handleChange as any} // Cast as any to handle the event type discrepancy
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Never">Never</MenuItem>
          <MenuItem value="Sometimes">Sometimes</MenuItem>
          <MenuItem value="Often">Often</MenuItem>
          <MenuItem value="Always">Always</MenuItem>
        </Select>
      </FormControl>
    </FormGroup>
  );
};

export default TransportationForm;
