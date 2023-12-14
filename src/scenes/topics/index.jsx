import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "./components/Header";
import { useGetTopicsQuery } from "./state/api";

const Topic = ({
  intensity,
  title,
  source,
  sector,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {sector}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(published).toFixed(2)}
        </Typography>
        <Rating value={likelihood} readOnly />

        <Typography variant="body2">{source}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Intensity: {intensity}</Typography>
          <Typography>Supply Left: {impact}</Typography>
          <Typography>
            Yearly <Impacts></Impacts> This Year: {yearlyimpactsTotal}
          </Typography>
          <Typography>
            Relevance This Year: {Relevance}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Topics = () => {
  const { data, isLoading } = useGetTopicsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TOPICS" subtitle="See your list of topics." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              intensity,
              title,
              source,
              insight,
              sector,
            }) => (
              <Topic
                key={intensity}
                intensity={ intensity}
                title={title}
                source={source}
                insight={insight}
                sector={sector}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Topics;