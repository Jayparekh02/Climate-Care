import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { boxStyles } from "../../utils/commonStyles";

export const Community = () => {
  return (
    <Box sx={{ ...boxStyles, bgcolor: "#F9F6EE" }}>
      <Container maxWidth="md">
        <Typography variant="h2" gutterBottom>
          What is Climate Care ?
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "20px", lineHeight: 2 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
          architecto maxime repudiandae omnis illo accusamus error voluptate
          similique? Aliquam fugiat pariatur ipsa voluptatum voluptates
          dignissimos doloremque hic fugit! Explicabo, dolorum. A adipisci animi
          deleniti corporis, laborum quisquam quo nobis optio voluptate non odio
          quam explicabo temporibus nemo dolore incidunt doloremque quos
          voluptates ipsam cumque ipsa perferendis, beatae id. Dolorum, quaerat.
          Tempore odio ad earum, vitae quasi laudantium, aspernatur deserunt
          velit veniam aut voluptates nihil doloremque numquam soluta quisquam
          rerum molestiae, quidem reprehenderit culpa accusantium veritatis
          atque omnis dolorem a? Blanditiis. Explicabo dignissimos quibusdam
          dolorem deserunt sit nihil debitis maxime in temporibus! Rem animi
          quam modi culpa autem quod. Eligendi praesentium, ab quo commodi atque
          laboriosam error dicta saepe consequuntur veniam. Velit sequi quis
          dignissimos rem nostrum odio alias enim aliquam consectetur animi
          voluptates officiis ea corporis, excepturi tenetur tempore asperiores
          ab laudantium corrupti sunt delectus nesciunt quos quam fugit. Error.
          Ad laudantium sequi id eum illum praesentium ducimus qui commodi
          dolore a, voluptatum accusamus ipsa ipsam maxime porro ut alias vero!
          Illo fugiat vero sint facere eligendi tempore consequatur voluptas!
        </Typography>
      </Container>
    </Box>
  );
};
