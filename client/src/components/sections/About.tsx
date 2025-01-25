import { Box, Container, Divider, Typography } from "@mui/material";
import { boxStyles } from "../../utils/commonStyles";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);

  return (
    <Box
      ref={ref}
      sx={{ ...boxStyles, bgcolor: "#F9F6EE" }}
      maxWidth={"100%"}
      minHeight={"100vh"}
    >
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          What is Climate Care ?
          <Divider />
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "20px", lineHeight: 2 }}>
          Climate Care stands as a testament to the power of collective
          responsibility, weaving together advanced digital tools with the
          spirit of community activism. By equipping you with real-time data and
          science-backed resources, the platform illuminates the realities of
          climate change, providing a solid foundation for informed engagement.
          As we navigate the complexities of ecological conservation, Climate
          Care acts as your ally, offering a suite of interactive features to
          personalize your advocacy. The Carbon Calculator, for instance, not
          only quantifies your environmental impact but also inspires and tracks
          your progress towards greener lifestyle choices. Meanwhile, the
          platform's event management capabilities foster a vibrant community
          where every member can be both a learner and a leader.
          <br />
          <br />
          In joining Climate Care, you're not just using an app; you're becoming
          part of a dedicated network committed to nurturing the environment.
          Your actions, no matter how small, join a chorus of efforts that can
          shape a more sustainable and resilient world. This is your invitation
          to step into a role that transcends the digital realm, making tangible
          impacts on the ground – impacts that our planet urgently needs.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
