import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Typography } from "@mui/material";

const AnimatedText: React.FC = () => {
  const containerControls = useAnimation();
  const textControls = useAnimation();

  const [mainText, setMainText] = useState<string>("Future");

  useEffect(() => {
    // Animate the whole container to fade in initially
    containerControls.start({ opacity: 1, y: 0 });

    const timeout = setTimeout(() => {
      // Fade out "Climate"
      textControls.start({ opacity: 0, y: 50 }).then(() => {
        // Change text to "Future"
        setMainText("Climate");
        // Fade in "Future"
        textControls.start({ opacity: 1, y: 0 });
      });
    }, 3000); // Change after 3 seconds

    return () => clearTimeout(timeout);
  }, [textControls, containerControls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial animation for the container
      animate={containerControls} // Animation control for the container
      transition={{ duration: 1 }} // Duration of the container transition
    >
      <Typography variant="h1" fontWeight="bold" gutterBottom letterSpacing={4}>
        <motion.span animate={textControls}>{mainText}</motion.span>
        <span>{" Care"}</span> {/* "Care" remains static and is not animated */}
      </Typography>
    </motion.div>
  );
};

export default AnimatedText;
