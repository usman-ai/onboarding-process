import React from "react";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <>
      <Box display={"flex"}>
        <Typography fontWeight={700} fontSize={20} sx={{ color: "#FFFFFF" }}>
          UNITED
        </Typography>
        <Typography
          fontWeight={700}
          fontSize={20}
          sx={{ color: "#FFFFFF", opacity: 0.5 }}
        >
          PROPERTIES
        </Typography>
      </Box>
    </>
  );
};

export default Logo;
