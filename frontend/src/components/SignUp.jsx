import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as LinkRouter } from "react-router-dom";
import userActions from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SignUpGoogle from "./SignUpGoogle";
import Paper from "@mui/material/Paper";
import logo from "../images/mytinerary-logo.png";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { country_list } from "../static/countries";
import { useState } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const getData = {
      nameUser: data.get("nameUser"),
      lastNameUser: data.get("lastName"),
      mail: data.get("mail"),
      password: data.get("password"),
      photoUser: data.get("photoUser"),
      country: data.get("country"),
      from: "signUpForm",
    };

    let res = await dispatch(userActions.signUp(getData));
    console.log(res);
    if (res && res.data.success) {
      try {
        navigate("/login", { replace: true }); //redirecciona
        toast.success(
          "You have been registered! Please check your email in order to verify your account"
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          backgroundPosition: "center",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ backgroundColor: "#fffbe0 !important" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "0 65px",
          }}
        >
          <img alt="imagen-logo" src={logo} width="200px" />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nameUser"
                  required
                  fullWidth
                  id="nameUser"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="photoUser"
                  label="Image"
                  type=""
                  id="photo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mail"
                  label="Email Address"
                  name="mail"
                  autoComplete="mail"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    id="country"
                    value={country}
                    name="country"
                    label="Country"
                    onChange={setCountry}
                  >
                    {country_list.map((country) => (
                      <MenuItem value={country}>{country}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <SignUpGoogle />
              <Box mt={3} mb={1}>
                <LinkRouter to={`/login`} href="#" variant="body2">
                  {"Already have an account? Sign in"}
                </LinkRouter>
              </Box>
              Or
              <Box mt={1}>
                <LinkRouter to={`/home`} href="#">
                  {"use the website without signing up"}
                </LinkRouter>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
