import React, { useContext } from "react";
import { FormContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { East, West } from "@mui/icons-material";

const CheckboxSection = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      singleFamily: false,
      residentialMultiFamily: false,
      commercialRetail: false,
      commercialIndustrial: false,
      commercialHospitality: false,
      commercialWarehousing: false,
      commercialOffice: false,
      other: false,
    },
    validate: (values) => {
      const errors = {};
      if (
        !values.singleFamily &&
        !values.residentialMultiFamily &&
        !values.commercialRetail &&
        !values.commercialIndustrial &&
        !values.commercialHospitality &&
        !values.commercialWarehousing &&
        !values.commercialOffice &&
        !values.other
      ) {
        errors.checkboxGroup = "Select at least one option";
      }
      return errors;
    },
    onSubmit: (values) => {
      const preferences = { preferences: values };
      const data = { ...formData, ...preferences };
      setFormData(data);

      const objectLength = Object.keys(data).length;
      if (objectLength === 3) {
        alert("Details saved successfully");
        navigate("/");
      } else {
        alert("Please complete all the steps");
      }
    },
  });

  const getCheckboxStyle = (isChecked) => ({
    backgroundColor: isChecked ? "#F6FBFF" : "white",
    color: isChecked ? "#35A0EE" : "black",
    padding: "8px",
    border: "2px solid #35A0EE",
    borderRadius: "4px",
    cursor: "pointer",
    height: "136px",
    width: "148px",
  });

  const titleStyle = () => ({
    position: "relative",
    top: "50px",
    left: "10px",
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display={"flex"} flexWrap={"wrap"} gap={2}>
        <div style={getCheckboxStyle(formik.values.singleFamily)}>
          <input
            type="checkbox"
            name="singleFamily"
            checked={formik.values.singleFamily}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}> Single Family</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.residentialMultiFamily)}>
          <input
            type="checkbox"
            name="residentialMultiFamily"
            checked={formik.values.residentialMultiFamily}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}> Residential multifamily</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.commercialRetail)}>
          <input
            type="checkbox"
            name="commercialRetail"
            checked={formik.values.commercialRetail}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}> Commercial Retail</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.commercialIndustrial)}>
          <input
            type="checkbox"
            name="commercialIndustrial"
            checked={formik.values.commercialIndustrial}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}>Commercial Industrial</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.commercialHospitality)}>
          <input
            type="checkbox"
            name="commercialHospitality"
            checked={formik.values.commercialHospitality}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}>Commercial Hospitality</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.commercialWarehousing)}>
          <input
            type="checkbox"
            name="commercialWarehousing"
            checked={formik.values.commercialWarehousing}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}> Commercial Warehousing</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.commercialOffice)}>
          <input
            type="checkbox"
            name="commercialOffice"
            checked={formik.values.commercialOffice}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}>Commercial Office</Typography>
        </div>
        <div style={getCheckboxStyle(formik.values.other)}>
          <input
            type="checkbox"
            name="other"
            checked={formik.values.other}
            onChange={formik.handleChange}
          />
          <Typography style={titleStyle()}> Other</Typography>
        </div>
      </Box>
      <Box>
        {formik.errors.checkboxGroup && (
          <Typography sx={{ color: "red", marginTop: 0, height: 0 }}>
            {formik.errors.checkboxGroup}
          </Typography>
        )}
      </Box>
      <Box marginY={2}>
        {Object.keys(formData).length < 2 && (
          <Typography sx={{ color: "red", marginTop: 0, height: 0 }}>
            {"Please complete all the steps"}
          </Typography>
        )}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={4}
      >
        <Link to={"/plans"} style={{ textDecoration: "none" }}>
          <Box display={"flex"} alignItems={"center"}>
            <West sx={{ color: "#2696E8", fontSize: 14 }} />
            <Typography sx={{ color: "#2696E8", fontSize: 16, marginLeft: 1 }}>
              Back to the previous step
            </Typography>
          </Box>
        </Link>
        <Box>
          <Link to={"/"}>
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
            Finish
            <East sx={{ fontSize: 14, marginLeft: 1 }} />
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CheckboxSection;
