import { Box, Typography } from "@mui/material";
import React from "react";
import CheckboxSection from "./CheckboxSection";

const PreferencesForm = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Montserrat Alternates'",
            marginBottom: 2,
          }}
        >
          What kind of real estate are you interested in?
        </Typography>
        <Box>
          <CheckboxSection />
        </Box>
      </Box>
    </>
  );
};

export default PreferencesForm;
