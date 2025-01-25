import { Box, Button, Container, Typography } from "@mui/material";
import FlowingText from "../textAnimation/FlowingText";

import { useNavigate } from "react-router-dom";
import landingBg2 from "../../assets/climateCare2.mp4";
import AnimatedText from "../textAnimation/AnimatedText";
import { useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
export const Landing = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.login);
  const handleButtonClick = () => {
    if (token) {
      // If user is logged in, scroll to the section below
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    } else {
      navigate("/login");
      // If user is not logged in, open the registration modal
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Box position="relative" width="100%" minHeight="100vh">
        <video className="landingBg" src={landingBg2} autoPlay loop muted />
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.4)" // Adding black overlay
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <Container maxWidth="lg">
            {/* <Typography
              variant="h1"
              fontWeight="bold"
              gutterBottom
              letterSpacing={4}
              // sx={{ color: "white" }}
            >
              Climate Care
            </Typography> */}
            <AnimatedText />

            <Typography
              variant="h4"
              letterSpacing={4}
              fontWeight={300}
              // sx={{ color: "white" }}
            >
              <FlowingText />
            </Typography>
            <Box sx={{ "& button": { mt: 4 } }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handleButtonClick}
                sx={{
                  cursor: "pointer",
                  color: "white",
                  fontSize: 16,
                  borderColor: "white",
                  letterSpacing: 4,
                  padding: 2,
                  "&:hover": {
                    borderColor: "#99cccc",
                    color: "#99cccc",
                  },
                }}
              >
                {t("welcome")}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};
