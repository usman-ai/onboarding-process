import { Box, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as QuoteIcon } from "../svg/‘‘.svg";
import { ReactComponent as UpIcon } from "../svg/UP.svg";

const Quotes = ({ quote, name, position }) => {
  return (
    <>
      <Box marginTop={10} display={"flex"} position={"relative"}>
        <Box
          bgcolor="#ffffff"
          height={56}
          width={56}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"absolute"}
          top={-20}
          left={-20}
          zIndex={2}
          boxShadow={5}
        >
          <QuoteIcon />
        </Box>
        <Box
          bgcolor="#ffffff"
          height={"15rem"}
          width={"23rem"}
          zIndex={1}
          p={5}
        >
          <Typography color={"#A4AEB4"} fontStyle={"italic"}>
            {quote}
          </Typography>
          <Typography
            marginTop={2}
            sx={{ fontFamily: "'Montserrat Alternates'" }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography color={"#A4AEB4"}>{position}</Typography>
            <UpIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Quotes;
