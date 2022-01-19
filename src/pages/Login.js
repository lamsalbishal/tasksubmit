import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, styled } from "@material-ui/core/styles";
import { LoginPage } from "../network/PostRequest";
import { useNavigate } from "react-router-dom";
import { StorageName } from "../const/const";
import { useDispatch } from "react-redux";
import { addLoginCheck, addUserDetails } from "../Store/actions/actions";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logo: {
    position: "absolute",
    top: -30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  round: {
    height: 64,
    width: 64,
    borderRadius: 50,
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 -1px 0 hsl(0deg 0% 43% / 5%)",
  },
  lockicon: {
    color: "blue",
  },
  box: {
    width: 320,
    background: "#fff",
    borderRadius: 8,
    padding: theme.spacing(5, 3, 3),
    boxShadow: "0 2px 4px hsl(0deg 0% 43% / 50%)",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "sans-serif",
  },
  signupBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#405089",
    padding: theme.spacing(0.6, 2.4),
    borderRadius: 30,
    color: "#405089",
  },
  signupinfo: {
    paddingTop: theme.spacing(0.5),
  },

  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(1.3, 0, 1.3, 0),
    borderRadius: theme.spacing(4),
    color: "#40508",
  },
  error: {
    color: "red",
    width: "100%",
    textAlign: "left",
  },
  errormsg: {
    color: "red",
    width: "100%",
    textAlign: "center",
    fontSize: 12,
  },
  textfield: {
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  buttonfield: {
    width: "100%",
    paddingTop: theme.spacing(5),
  },
  bottomField: {
    width: "100%",
    paddingTop: theme.spacing(2),
  },
  textBorder: {
    borderBottom: "2px solid #8adbdb",
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
    setErrorMessage("");
    if (e.target.value.length > 0) {
      setEmailMessage(false);
    }
  };

  // on change data on passowd field
  const onSubmitPassword = (e) => {
    setPasswordField(e.target.value);
    setErrorMessage("");
    if (e.target.value.length > 0) {
      setPasswordMessage(false);
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
            full_name: response.data.user.full_name,
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

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#405089",
    "&:hover": {
      backgroundColor: "#405089"[-20],
    },
  }));

  return (
    <div className="loaderCenter">
      <div className={classes.box}>
        <h1 className={classes.title}>Login to Docsumo</h1>
        <div className={classes.textfield}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Work Email"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{ disableUnderline: true }}
            className={classes.textBorder}
            onChange={(e) => onSubmitEmail(e)}
          />
          {emailMessage && (
            <div className={classes.error}>Please enter your email address</div>
          )}
        </div>
        <div className={classes.textfield}>
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            InputProps={{ disableUnderline: true }}
            autoComplete="current-password"
            onChange={(e) => onSubmitPassword(e)}
            className={classes.textBorder}
          />
          {passwordMessage && (
            <div className={classes.error}>Please enter your password</div>
          )}
        </div>

        <div className={classes.buttonfield}>
          <div className={classes.errormsg}>{errorMessage}</div>

          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => onSubmitLogin()}
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress color="white" size={16} /> : "LOGIN"}
            &nbsp; {loading && "LOGGING In ..."}
          </ColorButton>
        </div>

        <div className={classes.bottomField}>
          <Grid container>
            <Grid item xs>
              <div className={classes.signupinfo}>Don't have an account?</div>
            </Grid>
            <Grid item>
              <div className={classes.signupBox}>Sign Up</div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.logo}>
        <div className={classes.round}>
          <LockOutlinedIcon className={classes.lockicon} />
        </div>
      </div>
    </div>
  );
}
