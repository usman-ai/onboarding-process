import React, { useContext } from "react";
import { FormContext } from "../App";
import { useFormik } from "formik";
import * as yup from "yup";
import { East, West } from "@mui/icons-material";
import { Button, TextField, Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  fullName: yup.string("Enter your FullName").required("Full Name is required"),
  country: yup
    .string("Select your country")
    .required("Please enter your country"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
});
const ContactForm = () => {
  const { formData, setFormData } = useContext(FormContext);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    fullName: "",
    phoneNumber: "",
    country: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const contactDetails = { contactDetails: values };
      const data = { ...formData, ...contactDetails };
      setFormData(data);
      navigate("/plans");
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} rowGap={2.5}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <TextField
              sx={{
                "& .MuiInput-input": {
                  fontWeight: 700,
                },
              }}
              variant="standard"
              id="fullName"
              name="fullName"
              label="Full name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
            <Box>
              <PhoneInput
                inputStyle={{
                  border: "none",
                  borderBottom: "1px solid black",
                  width: "100%",
                  fontWeight: 700,
                }}
                containerStyle={{
                  border: "none",
                }}
                dropdownStyle={{ background: "white", border: "none" }}
                className="anonymous"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={(e) => formik.setFieldValue("phoneNumber", e)}
                onBlur={formik.handleBlur("phoneNumber")}
                country={""}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div
                  className="text-danger text-right"
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: 0,
                    height: 0,
                  }}
                >
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </Box>
          </Box>
          <TextField
            sx={{
              "& .MuiInput-input": {
                fontWeight: 700,
              },
            }}
            id="email"
            variant="standard"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Box>
            <InputLabel variant="standard" htmlFor="country">
              Country
            </InputLabel>
            <NativeSelect
              sx={{
                "& .MuiInput-input": {
                  fontWeight: 700,
                },
              }}
              defaultValue=""
              fullWidth
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
              inputProps={{
                name: "country",
                id: "country",
              }}
            >
              <option value="">Select a Country</option>
              <option value="ukraine">Ukraine</option>
              <option value="england">England</option>
              <option value="america">America</option>
            </NativeSelect>
            <Box>
              {formik.errors.country && (
                <Typography sx={{ color: "red", marginTop: 0, height: 0 }}>
                  {formik.errors.country}
                </Typography>
              )}
            </Box>
          </Box>
          <Typography variant="h6" fontWeight={700}>
            Privacy Policy
          </Typography>
          <Typography sx={{ color: "#A4AEB4" }}>
            We know you care about how your personal information is used and
            shared, so we take your privacy seriously
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <Typography sx={{ color: "#2696E8", fontSize: 16, marginRight: 1 }}>
              Expand privacy policy
            </Typography>
            <East sx={{ color: "#2696E8", fontSize: 14 }} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Box display={"flex"} alignItems={"center"}>
                <West sx={{ color: "#2696E8", fontSize: 14 }} />
                <Typography
                  sx={{ color: "#2696E8", fontSize: 16, marginLeft: 1 }}
                >
                  Back to the homepage
                </Typography>
              </Box>
            </Link>
            <Box>
              <Link to={"/plans"}>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "rgba(53, 160, 238, 0.1)",
                    marginRight: 1,
                    border: "none",
                  }}
                >
                  Skip for now
                </Button>
              </Link>
              <Button color="primary" variant="contained" type="submit">
                Next step
                <East sx={{ fontSize: 14, marginLeft: 1 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
