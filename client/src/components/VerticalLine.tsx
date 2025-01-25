import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface VerticalLineProps {
  playing: boolean;
}

export const VerticalLine: React.FC<VerticalLineProps> = ({ playing }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 2,
        backgroundColor: "white",
        height: playing ? "100%" : "0%",
      }}
      component={motion.div}
      animate={{
        height: playing ? "100%" : "0%",
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    />
  );
};
