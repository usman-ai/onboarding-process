import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { East } from "@mui/icons-material";
import { ReactComponent as ActiveBox } from "../svg/Active.svg";
import { ReactComponent as ActiveLine } from "../svg/ActiveLine.svg";
import Logo from "../components/Logo";
import Quotes from "../components/Quotes";
import PreferencesForm from "../components/PreferencesForm";

const InvestmentPreferences = () => {
  return (
    <>
      <Grid container>
        <Grid
          item
          height={"100vh"}
          xs={12}
          sm={6}
          md={4}
          sx={{ bgcolor: "#2696E8" }}
        >
          <Box sx={{ padding: 5, marginLeft: 5 }}>
            <Logo />
            <Box marginTop={15}>
              <Typography
                sx={{
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActiveBox style={{ height: 20, width: 20, marginRight: 10 }} />
                Contact details
              </Typography>
              <ActiveLine style={{ height: 20, width: 5, marginLeft: 8 }} />
              <br />
              <ActiveLine style={{ height: 20, width: 5, marginLeft: 8 }} />
              <Typography
                sx={{
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActiveBox style={{ height: 20, width: 20, marginRight: 10 }} />
                Investment plans
              </Typography>
              <ActiveLine style={{ height: 20, width: 5, marginLeft: 8 }} />
              <br />
              <ActiveLine style={{ height: 20, width: 5, marginLeft: 8 }} />
              <Typography
                sx={{
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActiveBox style={{ height: 20, width: 20, marginRight: 10 }} />
                Investment preferences
              </Typography>
            </Box>
            <Box>
              <Quotes
                quote="United Properties is about fast & easy searching, buying, selling and investing ever — online, with an expert by our side"
                name="Ollie Mcmahon"
                position="MANAGING DIRECTOR"
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          height={"100vh"}
          xs={12}
          sm={6}
          md={8}
          paddingX={15}
          paddingY={5}
        >
          <Container>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                sx={{
                  color: "#A4AEB4",
                  fontSize: 16,
                  fontFamily: "'Montserrat'",
                }}
              >
                STEP 3 OF 3
              </Typography>
              <Box display={"flex"}>
                <Typography
                  sx={{ color: "#A4AEB4", marginRight: 2, fontSize: 16 }}
                >
                  Lost or have trouble?
                </Typography>
                <Typography
                  sx={{ color: "#2696E8", marginRight: 2, fontSize: 16 }}
                >
                  Get help
                </Typography>
                <East sx={{ color: "#2696E8" }} />
              </Box>
            </Box>
            <Box width={640}>
              <Typography
                variant="h4"
                fontWeight={900}
                marginTop={5}
                marginBottom={5}
              >
                Investment preferences
              </Typography>
              <Typography sx={{ color: "#A4AEB4" }}>
                This will help us figure out what your investment options are so
                that we can show you only possibly intresting for you deals
              </Typography>
              <Box marginY={4}>
                <PreferencesForm />
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default InvestmentPreferences;
