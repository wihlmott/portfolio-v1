import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  addNewUserToDB,
  createNewUser,
  retrieveAllUsers,
  signInUser,
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from "../../Firebase";
import { useContext, useEffect, useState } from "react";
import { PageContext, UserContext } from "../Context/Context";
import { PAGES } from "../Config";
import SigninInputs from "./SigninInputs";

const LoginCard = () => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);

  let newUser = true;

  const [loginPressed, setLoginPressed] = useState(false);
  const [newUserPressed, setNewUserPressed] = useState(false);
  const [buttonText, setButtonText] = useState(`New User`);

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");

  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const setEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (email.trim().length < 1) return;
    setEmailIsValid(email.includes("@"));
  }, [email]);

  // const rememberMeHandler = (e) => {
  //   console.log(`handle remember me ` + e.target.checked);
  // };
  // const forgotPasswordHandler = () => {
  //   console.log(`handle forgotten password`);
  // };

  const loginWithFacebook = () => {
    console.log(`login with facebook`);
    // signInWithFacebook();
  };

  const loginWithTwitter = () => {
    console.log(`login with twitter`);
    // signInWithTwitter();
  };

  const loginWithGoogle = async () => {
    console.log(`login with google`);

    try {
      setLoading(true);
      const activeUser = await signInWithGoogle();
      const allUsers = await retrieveAllUsers();
      setUser(activeUser.user.email);
      setPage(PAGES.dashboard_page);

      allUsers.forEach((el) => {
        console.log(el, activeUser.user.email);
        if (el === activeUser.user.email) newUser = false;
      });

      setLoading(false);
      if (!newUser) return;
      addNewUserToDB(activeUser.user.email);
      setPage(PAGES.profile_page);
    } catch (err) {
      alert(`could not login with google -- ${err.message}`);
    }
  };
  const signUp = async () => {
    if (newUserPressed) {
      if (email === "" || !emailIsValid) return;
      try {
        setLoading(true);
        const newUser = await createNewUser(email, password); //create new user
        addNewUserToDB(newUser); //add to db first time user
        setUser(newUser); //set the user as active
        setPage(PAGES.profile_page); //set page to profile page on first login
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(`could not sign in -- ${err.message}`);
      }
    }
    if (!newUserPressed) {
      setNewUserPressed(true);
      setButtonText(`Sign Up`);
    }
  };
  const login = async () => {
    if (loginPressed) {
      if (email.trim().length < 1 || !emailIsValid) return;

      try {
        setLoading(true);
        setUser(await signInUser(email, password)); //set user, by email address
        setPage(PAGES.dashboard_page); //go to landing page after signing in
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(`could not login -- ${err.message}`);
      }
    }
    if (!loginPressed) setLoginPressed(true);
  };
  const resetPressed = () => {
    setLoginPressed(false);
    setNewUserPressed(false);
    setButtonText(`New User`);
  };

  return (
    <>
      {loading && <LinearProgress />}
      <Grid container>
        <Grid item xs={1} md={4}></Grid>
        <Grid item xs={10} md={4}>
          <Card
            sx={{
              width: 320,
              mt: 2,
              p: 1,
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <Typography align="center">Sign In</Typography>
            <br />
            <Grid container columnSpacing={1}>
              <Grid item xs={4} md={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1, mb: 2 }}
                  onClick={loginWithGoogle}
                >
                  <GoogleIcon />
                </Button>
              </Grid>
              <Grid item xs={4} md={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1, mb: 2 }}
                  onClick={loginWithFacebook}
                >
                  <FacebookIcon />
                </Button>
              </Grid>
              <Grid item xs={4} md={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 1, mb: 2 }}
                  onClick={loginWithTwitter}
                >
                  <TwitterIcon />
                </Button>
              </Grid>
              <Grid
                item
                xs={5.4}
                md={5.4}
                borderBottom="1px solid rgba(128, 128, 128, 0.6)"
                marginBottom={1}
                marginLeft={1}
              ></Grid>
              <Grid item xs={1} md={1} marginLeft={-1}>
                <Typography
                  align="center"
                  color="rgba(128, 128, 128)"
                  variant="subtitle"
                >
                  OR
                </Typography>
              </Grid>
              <Grid
                item
                xs={5.4}
                md={5.4}
                borderBottom="1px solid rgba(128, 128, 128, 0.6)"
                marginBottom={1}
              ></Grid>

              {newUserPressed && (
                <SigninInputs
                  setEmailHandler={setEmailHandler}
                  emailIsValid={emailIsValid}
                  setPasswordHandler={setPasswordHandler}
                />
              )}
              {loginPressed && (
                <SigninInputs
                  setEmailHandler={setEmailHandler}
                  emailIsValid={emailIsValid}
                  setPasswordHandler={setPasswordHandler}
                />
              )}
            </Grid>
            {!newUserPressed && (
              <Button
                sx={{ mb: 1, mt: 1 }}
                variant="contained"
                fullWidth
                onClick={login}
              >
                Login
              </Button>
            )}
            {!loginPressed && (
              <Button
                sx={{
                  mb: 1,
                  mt: 1,
                  // backgroundColor: `${
                  //   email.trim().length > 0 && emailIsValid ? `primary` : `grey`
                  // }`,
                }}
                variant="contained"
                fullWidth
                onClick={signUp}
              >
                {buttonText}
              </Button>
            )}
            {(loginPressed || newUserPressed) && (
              <Button onClick={resetPressed}>back</Button>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginCard;
