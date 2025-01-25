import { motion } from "framer-motion";

function FlowingText() {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const text = "Your Pathway to a Sustainable Tomorrow";

  return (
    <div style={{ position: "relative", maxWidth: "100%" }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sentence}
        style={{ display: "inline-block" }}
      >
        {text.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default FlowingText;
