import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { createResourceThunk } from "./resourceSlice";

const CreateResourceForm = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useAppDispatch();
  const [resourceType, setResourceType] = useState("article"); // Default to 'article'
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  const handleCreate = () => {
    if (!title || !description || !resourceLink || !resourceType) {
      alert("All fields are required.");
      return;
    }
    const newResource = { title, description, resourceLink, resourceType };
    dispatch(createResourceThunk(newResource)); // Dispatch the createResourceThunk with newResource data
    // Reset form fields after dispatch
    setResourceType("article");
    setTitle("");
    setDescription("");
    setResourceLink("");
    closeModal();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="resource-type-label">Resource Type</InputLabel>
        <Select
          labelId="resource-type-label"
          id="resource-type-select"
          value={resourceType}
          label="Resource Type"
          onChange={(e) => setResourceType(e.target.value)}
        >
          <MenuItem value="article">Article</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Resource Link"
        value={resourceLink}
        onChange={(e) => setResourceLink(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleCreate} variant="contained" color="primary">
        Create Resource
      </Button>
    </Box>
  );
};

export default CreateResourceForm;