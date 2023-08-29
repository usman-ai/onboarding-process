import React, { useState, useContext } from "react";
import { FormContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { East, West } from "@mui/icons-material";
import { Button, Box, Typography, Slider, TextField } from "@mui/material";
const validationSchema = yup.object({
  investor: yup
    .string("Please select an option")
    .required("Selection is required"),
});

const followersMarks = [
  {
    value: 0,
    scaledValue: 10000,
    label: "$10,000",
  },
  {
    value: 25,
    scaledValue: 50000,
    label: "$50,000",
  },
  {
    value: 50,
    scaledValue: 100000,
    label: "$100,000",
  },
  {
    value: 75,
    scaledValue: 200000,
    label: "$200,000",
  },
  {
    value: 100,
    scaledValue: 500000,
    label: "$500,000",
  },
  {
    value: 125,
    scaledValue: 1000000,
    label: "$1,000,000+",
  },
];

function reverseInterpolateValue(scaledValue) {
  if (scaledValue === undefined) {
    return undefined;
  }
  // Find the two data points between which the scaledValue falls
  let dataPoint1, dataPoint2;
  for (let i = 0; i < followersMarks.length - 1; i++) {
    if (
      scaledValue >= followersMarks[i].scaledValue &&
      scaledValue <= followersMarks[i + 1].scaledValue
    ) {
      dataPoint1 = followersMarks[i];
      dataPoint2 = followersMarks[i + 1];
      break;
    }
  }

  // Perform reverse linear interpolation
  const value =
    dataPoint1.value +
    ((scaledValue - dataPoint1.scaledValue) *
      (dataPoint2.value - dataPoint1.value)) /
      (dataPoint2.scaledValue - dataPoint1.scaledValue);

  return value;
}

function interpolateScaledValue(value) {
  // Find the two data points between which the value falls
  let dataPoint1, dataPoint2;
  for (let i = 0; i < followersMarks.length - 1; i++) {
    if (
      value >= followersMarks[i].value &&
      value <= followersMarks[i + 1].value
    ) {
      dataPoint1 = followersMarks[i];
      dataPoint2 = followersMarks[i + 1];
      break;
    }
  }

  // Perform linear interpolation
  const scaledValue =
    dataPoint1.scaledValue +
    ((dataPoint2.scaledValue - dataPoint1.scaledValue) *
      (value - dataPoint1.value)) /
      (dataPoint2.value - dataPoint1.value);

  return scaledValue;
}

//Scale the values
const scaleValues = (valueOriginal) => {
  return [scale(valueOriginal)];
};
const scale = (value) => {
  if (value === undefined) {
    return undefined;
  }
  const previousMarkIndex = Math.floor(value / 25);
  const previousMark = followersMarks[previousMarkIndex];
  const remainder = value % 25;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = followersMarks[previousMarkIndex + 1];
  const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
  return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
  if (num > 9999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else if (num < 9000) {
    return num; // if value < 9000, nothing to do
  }
}

const PlansForm = () => {
  const { formData, setFormData } = useContext(FormContext);
  const plan = formData.plan;
  const navigate = useNavigate();
  const [minNum, setMinNum] = useState(plan?.from || 50000);
  const [maxNum, setMaxNum] = useState(plan?.to || 1000000);
  const minmin = 0;
  const maxmax = 125;
  const [priceRangeValue, setPriceRangeValue] = useState(
    [scaleValues(plan?.from), scaleValues(plan?.to)] || [25, 50]
  );
  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(interpolateScaledValue(newValue[0]));
    setMaxNum(interpolateScaledValue(newValue[1]));
    setPriceRangeValue(newValue);
  };

  const rangeValidatorMin = (value) => {
    if (value) {
      if (value < 10000) {
        value = 10000;
      } else if (value > 1000000) {
        value = 1000000;
      }
      const minRange = reverseInterpolateValue(value);
      setMinNum(value);
      setPriceRangeValue([minRange, priceRangeValue[1]]);
    }
  };
  const rangeValidatorMax = (value) => {
    if (value) {
      if (value < 10000) {
        value = 10000;
      } else if (value > 1000000) {
        value = 1000000;
      }
      const maxRange = reverseInterpolateValue(value);
      setMaxNum(value);
      setPriceRangeValue([priceRangeValue[0], maxRange]);
    }
  };
  const initialValues = {
    investor: "yes",
    from: 10000,
    to: 50000,
  };
  const formik = useFormik({
    initialValues: plan || initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const plans = {
        plans: { investor: values.investor, from: minNum, to: maxNum },
      };
      const data = { ...formData, ...plans };
      setFormData(data);
      navigate("/preferences");
    },
  });

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              gap={4}
              marginBottom={6}
            >
              <TextField
                sx={{
                  "& .MuiInput-input": {
                    fontWeight: 700,
                  },
                }}
                name="from"
                id="from"
                label="From"
                type="number"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={minNum}
                onChange={(e) => {
                  rangeValidatorMin(Number(e.target.value));
                }}
              />
              <TextField
                sx={{
                  "& .MuiInput-input": {
                    fontWeight: 700,
                  },
                }}
                name="to"
                id="to"
                label="To"
                type="number"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={maxNum}
                onChange={(e) => {
                  rangeValidatorMax(Number(e.target.value));
                }}
              />
            </Box>
            <Slider
              sx={{
                color: "#35A0EE",
                "& .MuiSlider-rail": {
                  backgroundColor: "#E9F0F5",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#35A0EE",
                },
                "& .MuiSlider-markLabel": {
                  color: "#35A0EE",
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#35A0EE",
                  borderRadius: "none",
                },
                "& .MuiSlider-mark": {
                  backgroundColor: "#35A0EE",
                  width: "4px",
                  height: "20px",
                },
              }}
              getAriaLabel={() => "Price range"}
              value={priceRangeValue}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={minmin}
              max={maxmax}
              step={1}
              marks={followersMarks}
              scale={scaleValues}
              valueLabelFormat={numFormatter}
            />
          </Box>
          <Typography
            sx={{ fontFamily: "'Montserrat Alternates'" }}
            variant="h5"
            fontWeight={900}
            marginY={2}
          >
            Are you an accredited investor?
          </Typography>
          <Box display={"flex"} flexDirection={"column"} rowGap={2.5}>
            <Box display={"flex"} gap={2} marginBottom={5}>
              <Box
                className={`radio-label ${
                  formik.values.investor === "yes" ? "selected" : ""
                }`}
              >
                <input
                  className={`radio-input ${
                    formik.values.investor === "yes" ? "selected" : ""
                  }`}
                  type="radio"
                  id="yes"
                  name="investor"
                  value="yes"
                  checked={formik.values.investor === "yes"}
                  onChange={formik.handleChange}
                />
                <Typography marginTop={0.5} marginLeft={1}>
                  {" "}
                  Yes
                </Typography>
              </Box>

              <Box>
                <Box
                  className={`radio-label ${
                    formik.values.investor === "no" ? "selected" : ""
                  }`}
                >
                  <input
                    className={`radio-input ${
                      formik.values.investor === "yes" ? "selected" : ""
                    }`}
                    type="radio"
                    id="no"
                    name="investor"
                    value="no"
                    checked={formik.values.investor === "no"}
                    onChange={formik.handleChange}
                  />
                  <Typography marginTop={0.5} marginLeft={1}>
                    {" "}
                    No
                  </Typography>
                </Box>
              </Box>
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
                    Back to the previous step
                  </Typography>
                </Box>
              </Link>
              <Box>
                <Link to={"/preferences"}>
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
    </>
  );
};

export default PlansForm;
