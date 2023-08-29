import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { East } from "@mui/icons-material";
import { ReactComponent as ActiveBox } from "../svg/Active.svg";
import { ReactComponent as NotActive } from "../svg/NotActive.svg";
import { ReactComponent as ActiveLine } from "../svg/ActiveLine.svg";
import { ReactComponent as NotActiveLine } from "../svg/NotActiveLine.svg";
import Logo from "../components/Logo";
import Quotes from "../components/Quotes";
import ContactForm from "../components/ContactForm";

const ContactDetails = () => {
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
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <NotActive style={{ height: 20, width: 20, marginRight: 10 }} />
                Investment plans
              </Typography>
              <NotActiveLine style={{ height: 20, width: 5, marginLeft: 8 }} />
              <br />
              <NotActiveLine style={{ height: 20, width: 5, marginLeft: 8 }} />
              <Typography
                sx={{
                  color: "#FFFFFF",
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <NotActive style={{ height: 20, width: 20, marginRight: 10 }} />
                Investment preferences
              </Typography>
            </Box>
            <Box>
              <Quotes
                quote="We care about your time, that's why we created a 3-stage onboarding
            that will not take more than 5 minutes to complete"
                name=" William Mac"
                position="CO-FOUNDER, INVESTOR"
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
                STEP 1 OF 3
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
                Contact details
              </Typography>
              <Typography sx={{ color: "#A4AEB4" }}>
                Welcome to United Properties, we are glad to see you! Let’s get
                started by letting us know a little bit about you
              </Typography>
              <Box marginY={4}>
                <ContactForm />
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactDetails;
