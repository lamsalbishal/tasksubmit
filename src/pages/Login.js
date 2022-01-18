import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginPage } from "../network/PostRequest";
import { CircularProgress, Paper } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { StorageName } from "../const/const";
import { useDispatch } from "react-redux";
import { addLoginCheck, addUserDetails } from "../Store/actions/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
    width: "100%",
    textAlign: "left",
  },
  textfield: {
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  icon_box: {
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // on change data on email field
  const onSubmitEmail = (e) => {
    setEmailField(e.target.value);
    if (e.target.value.length > 0) {
      setEmailMessage(false);
    } else {
      setEmailMessage(true);
    }
  };

  // on change data on passowd field
  const onSubmitPassword = (e) => {
    setPasswordField(e.target.value);
    if (e.target.value.length > 0) {
      setPasswordMessage(false);
    } else {
      setPasswordMessage(true);
    }
  };

  // on login data submit and validation
  const onSubmitLogin = () => {
    if (emailField.length > 0 && passwordField.length > 0) {
      setPasswordMessage(false);
      setEmailMessage(false);
      setLoading(true);
      setErrorMessage("");

      const data = {
        email: emailField,
        password: passwordField,
      };

      LoginPage(data).then((response) => {
        setLoading(false);

        if (response.status_code === 200) {
          const userColl = {
            company_name: response.data.user.company_name,
            created_at: response.data.user.created_at,
            token: response.data.token,
          };

          dispatch(addLoginCheck());
          dispatch(addUserDetails(userColl));
          localStorage.setItem(StorageName, JSON.stringify(userColl));
          navigate("/");
        } else if (response.status_code === 404) {
          setErrorMessage(response.error);
        } else if (response.status_code === 429) {
          setErrorMessage(response.error);
        }
      });
    } else {
      if (emailField === "") {
        setEmailMessage(true);
      } else {
        setEmailMessage(false);
      }
      if (passwordField === "") {
        setPasswordMessage(true);
      } else {
        setPasswordMessage(false);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.textfield}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => onSubmitEmail(e)}
            />
            {emailMessage && (
              <div className={classes.error}>
                Please enter your email address
              </div>
            )}
          </div>
          <div className={classes.textfield}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onSubmitPassword(e)}
            />
            {passwordMessage && (
              <div className={classes.error}>Please enter your password</div>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => onSubmitLogin()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={16} /> : "LOGIN"}
            {loading && "LOGGING In ..."}
          </Button>

          <div className={classes.error}>{errorMessage}</div>

          <div className={classes.textfield}>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </Container>
  );
}
