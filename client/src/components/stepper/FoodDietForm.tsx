import React from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
} from "@mui/material";
import { StepperFormData } from "../../utils/types";

interface FoodDietFormProps {
  emissionData: StepperFormData;
  setEmissionData: (
    updateFn: (prevData: StepperFormData) => StepperFormData
  ) => void;
}

const FoodDietForm: React.FC<FoodDietFormProps> = ({
  emissionData,
  setEmissionData,
}) => {
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { value: unknown }
    >
  ) => {
    const { name, value, checked, type } = event.target as HTMLInputElement;
    const updateValue = type === "checkbox" ? checked : value;

    setEmissionData((prevData) => ({
      ...prevData,
      foodDiet: {
        ...prevData.foodDiet,
        [name]: updateValue,
      },
    }));
  };

  return (
    <FormGroup>
      <FormControl component="fieldset" sx={{ mt: 3 }}>
        <FormLabel component="legend">
          What type of diet do you primarily follow?
        </FormLabel>
        <RadioGroup
          row
          name="dietType"
          value={emissionData.foodDiet.dietType || ""}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Omnivore"
            control={<Radio />}
            label="Omnivore (Meat and Vegetables)"
          />
          <FormControlLabel
            value="Vegetarian"
            control={<Radio />}
            label="Vegetarian (No Meat)"
          />
          <FormControlLabel
            value="Vegan"
            control={<Radio />}
            label="Vegan (No Animal Products)"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        label="If comsume, how many meals containing meat do you consume per week?"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        name="mealsContainingMeatPerWeek"
        value={emissionData.foodDiet.mealsContainingMeatPerWeek || ""}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="prefersOrganic"
            checked={emissionData.foodDiet.prefersOrganic || false}
            onChange={handleChange}
          />
        }
        label="Do you prefer to buy organic food?"
      />
    </FormGroup>
  );
};

export default FoodDietForm;
