// src/components/LanguageSwitcher.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Correcting the event type to SelectChangeEvent
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <FormControl sx={{ width: 200, mt: 2, color: "white" }}>
      <InputLabel id="language-selector-label">Language</InputLabel>
      <Select
        labelId="language-selector-label"
        id="language-selector"
        value={i18n.language}
        label="Language"
        onChange={handleLanguageChange} // Use the corrected event handler
        variant="outlined"
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="de">Deutsch</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        {/* Add more languages as needed */}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
