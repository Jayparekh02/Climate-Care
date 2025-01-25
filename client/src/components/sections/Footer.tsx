
import React from "react";
import { Box, Container, Typography } from "@mui/material";
 
const Footer: React.FC = () => {
  return (
    <Box
      bgcolor="#333"
      color="white"
      py={6}
      mt={4}
      textAlign="center"
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          { }
          © {new Date().getFullYear()} Climate Care. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
 
export default Footer;
 
