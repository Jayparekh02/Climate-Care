import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useEffect, useRef } from "react";
import "../App.css"; // Make sure to import your CSS for styling
import { Box, Typography } from "@mui/material";

const images = [
  "src/assets/ClimateBgFlow1.jpeg", // Replace these paths with your image URLs
  "src/assets/ClimateBgFlow2.jpeg",
  "src/assets/ClimateBgFlow3.jpeg",
  "src/assets/ClimateBgFlow4.jpeg",
];

const imageDisplayDuration = 3; // in seconds

const imageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const BackgroundFlow = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  useEffect(() => {
    // Change the current image every `imageDisplayDuration` seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, imageDisplayDuration * 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </AnimatePresence>
    </Box>
  );
};

export default BackgroundFlow;
