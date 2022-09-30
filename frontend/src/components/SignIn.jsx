import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as LinkRouter } from "react-router-dom";
import userActions from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SignInGoogle from "./SignInGoogle";
import logo from "../images/mytinerary-logo.png";


export default function SignInSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => { //cuando el user hace click se ejecuta la funcion
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const getData = {
      mail: data.get("mail"),
      password: data.get("password"),
      from: "signUpForm",
    };
    let res = await dispatch(userActions.signIn(getData)); //le va a mandar el obj que acaba de crear {mail,pass y from}
    if (res && res.data.success) {
      try {
        navigate("/home", { replace: true }); //redirecciona
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
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="mail"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <SignInGoogle />
              <Box mt={3} mb={1}>
                <LinkRouter to={`/signup`} href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </LinkRouter>
              </Box>
              Or
              <Box mt={1}>
                <LinkRouter to={`/home`} href="#">
                  {"use the website without loggin in"}
                </LinkRouter>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
