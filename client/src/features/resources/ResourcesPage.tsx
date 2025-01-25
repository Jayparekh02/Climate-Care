// pages/ResourcesPage.tsx
import React, { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";
import { IResource } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArticlesThunk } from "./resourceSlice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Container, Divider, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateResourceForm from "./CreateResourceForm";

const ResourcesPage: React.FC = () => {
  const { resourcetype } = useAppSelector((state) => state.resources);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchArticlesThunk());
  }, [dispatch]);

  // const handleCreateNewResource = async (newResourceData) => {
  //   try {
  //     await createResource(newResourceData);
  //     loadResources(); // Refresh the list
  //   } catch (error) {
  //     console.error("Error creating new resource:", error);
  //   }
  // };

  return (
    <Box bgcolor={"#F9F6EE"} width={"100%"} height={"auto"}>
      <Container>
        <Box
          py={4}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "left" }}>
            Educational Resources
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
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateModal(true)}
          >
            Create Resource
          </Button>
        </Box>

        <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
            }}
          >
            {/* <Typography>HELLO</Typography> */}
            <CreateResourceForm closeModal={() => setOpenCreateModal(false)} />
          </Box>
        </Modal>

        <Divider />
        <Grid container spacing={1} mt={2}>
          {resourcetype.map((resource) => (
            <Grid item>
              <ResourceCard resource={resource} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ResourcesPage;