// components/ResourceCard.tsx
import React from "react";
import { IResource } from "../../utils/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

interface ResourceCardProps {
  resource: IResource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        maxWidth: 345,
        m: theme.spacing(2),
        height: 200,
        bgcolor: "rgba(0,0,0,0.2)",
      }}
    >
      {resource.imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={resource.imageUrl}
          alt={resource.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {resource.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {resource.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          href={resource.resourceLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResourceCard;