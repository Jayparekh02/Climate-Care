import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Emission } from "../models/Emission";
import { useEffect } from "react";
import { emissionHistory } from "../features/emission/emissionSlice";

interface EmissionCardProps {
  emission: Emission;
}

const EmissionCard: React.FC<EmissionCardProps> = ({ emission }) => {
  let cardColor: string = "";
  let level: string = "";
  let recommendations: string[] = [];
  if (emission.emissionScore) {
    if (emission.emissionScore >= 70 && emission?.emissionScore < 80) {
      level = "Sustainable";
      cardColor = "rgb(60, 179, 113,0.4)"; // Eco Green
    } else if (emission.emissionScore >= 80 && emission.emissionScore < 90) {
      level = "Moderate";
      cardColor = "rgb(153, 204, 204,0.4)"; // Warning Yellow
    } else if (emission.emissionScore >= 90 && emission.emissionScore <= 100) {
      level = "Critical";
      cardColor = "rgb(255, 87, 34,0.4)"; // Warning Red
    }
    if (emission.emissionScore >= 70 && emission.emissionScore < 80) {
      recommendations = [
        "Great work maintaining a low carbon footprint!",
        "To enhance your efforts, consider increasing your reliance on renewable energy sources at home and work",
      ];
    } else if (emission.emissionScore >= 80 && emission.emissionScore < 90) {
      recommendations = [
        "Your efforts are commendable, but there's room for improvement.",
        "Reduce your energy consumption by updating to high-efficiency appliances.",
        "Consider switching to a green energy provider.",
      ];
    } else if (emission.emissionScore >= 90 && emission.emissionScore <= 100) {
      recommendations = [
        "Immediate action is needed to mitigate your environmental impact.",
        "Explore transitioning to a zero-emissions vehicle.",
        "Commit to zero-waste practices in daily life.",
        "Consider adopting a more plant-based diet to reduce your carbon footprint.",
      ];
    }
  }

  // Define recommendations based on emission score range

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: 540, sm: 360 },
        height: 300,
        bgcolor: cardColor, // Dynamically set card color based on emission score
        // padding: 2,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        px={2}
        pt={2}
        // height="100%"
      >
        <Typography variant="h3">{emission.emissionScore}</Typography>
        <Typography variant="h5">Level: {level}</Typography>
      </Box>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1">
          <strong>Recommendations:</strong>
        </Typography>
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>
              <Typography textAlign={"justify"} variant="body2">
                {recommendation}
              </Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const EmissionHistory = () => {
  const BlueText = styled("span")({
    color: "#99cccc",
  });

  const { user } = useAppSelector((state) => state.login);
  const { history } = useAppSelector((state) => state.emission);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(emissionHistory(user?._id));
    }
  }, [dispatch]);
  console.log(history);
  return (
    <Box sx={{ width: "100%", height: "auto" }} alignContent={"center"}>
      <Container>
        <Typography py={4} variant="h2" fontWeight={500} textAlign={"center"}>
          Hi, {user?.name}
        </Typography>

        <Divider />
        <Typography pt={4} variant="h4" lineHeight={1.5} textAlign={"center"}>
          Let's check your <BlueText>carbon emission history</BlueText>, shall
          we? <br /> This will help you monitor the changes your lifestyle!
        </Typography>
        <Grid container spacing={4} mt={2}>
          {history.map((data) => (
            <Grid item md={4} lg={4} sm={6}>
              <EmissionCard emission={data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EmissionHistory;
