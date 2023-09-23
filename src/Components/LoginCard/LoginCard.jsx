import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import GoogleIcon from "@mui/icons-material/Google";
import {
  addAdmin,
  addNewUserToDB,
  createNewUser,
  retrieveAllAdmins,
  retrieveAllUsers,
  setPreferences,
  setProfileInfo,
  signInUser,
  signInWithGoogle,
} from "../../Firebase";
import { useContext, useEffect, useState } from "react";
import { AdminContext, PageContext, UserContext } from "../Context/Context";
import { PAGES } from "../Config";
import SigninInputs from "./SigninInputs";
import Role from "./Role";

const LoginCard = () => {
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState();

  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [admin, setAdmin] = useContext(AdminContext);

  let newUser = true;

  const [existingUserPressed, setExistingUserPressed] = useState(false);
  const [newUserPressed, setNewUserPressed] = useState(false);
  const [buttonText, setButtonText] = useState(`New User`);
  const [existingUserTxt, setExistingUserTxt] = useState("Existing User");

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminEmailIsValid, setAdminEmailIsValid] = useState(true);

  const setPasswordHandler = (e) => setPassword(e.target.value);
  const setEmailHandler = (e) => setEmail(e.target.value);

  const [role, setRole] = useState("Supervisor");
  const roleHandler = (e) => setRole(e.target.value);

  const setAdminEmailHandler = (e) => setAdminEmail(e.target.value);

  useEffect(() => {
    if (email.trim().length < 1) return;
    setEmailIsValid(email.includes("@"));
  }, [email]);
  useEffect(() => {
    if (adminEmail.trim().length < 1) return;
    setAdminEmailIsValid(adminEmail.includes("@"));
  }, [adminEmail]);

  // const rememberMeHandler = (e) => {
  //   console.log(`handle remember me ` + e.target.checked);
  // };
  // const forgotPasswordHandler = () => {
  //   console.log(`handle forgotten password`);
  // };

  const GoogleOption = () => {
    return (
      <>
        <Grid item xs={12} md={12}>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            onClick={loginWithGoogle}
          >
            <GoogleIcon />
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
      </>
    );
  };

  const loginWithGoogle = async () => {
    console.log(`login with google`);

    if (role !== "Administrator" && adminEmail === "") return;

    try {
      setLoading(true);
      const activeUser = await signInWithGoogle();

      //if user exists
      // retrieveAllAdmins().then((allAdmins) =>
      //   allAdmins.forEach((specificAdmin) =>
      //     retrieveAllUsers(specificAdmin).then((usersArr) => {
      //       usersArr.forEach((specificUser) =>
      //         specificUser === activeUser.user.email
      //           ? setAdmin(specificAdmin) && (newUser = false)
      //           : ""
      //       );
      //     })
      //   )
      // );

      //if user selected that they are a new user, setting admin name based on their selection
      // const adminName =
      //   role !== "Administrator" ? adminEmail : activeUser.user.email;
      setAdmin(role !== "Administrator" ? adminEmail : activeUser.user.email);
      // if (!existingUserPressed) {
      //   adminName =
      //   role !== "Administrator" ? adminEmail : activeUser.user.email;
      //   setAdmin(adminName);
      // }

      setUser(activeUser.user.email);
      setPage(PAGES.dashboard_page);
      setLoading(false);
      if (!newUser) return;

      //check if admin exists
      let adminExists = false;
      // retrieveAllAdmins().then((allAdmins) => allAdmins.find());
      addAdmin(adminName);
      //save admin email to local storage
      localStorage.setItem("adminName", JSON.stringify(adminName));

      addNewUserToDB(adminName, activeUser.user.email);

      setProfileInfo(adminName, activeUser.user.email, {
        firstName: activeUser.user.displayName.split(" ")[0],
        lastName: activeUser.user.displayName.split(" ")[1],
        email: activeUser.user.email,
      });
      setPreferences(adminName, activeUser.user.email, { cardView: "false" });
      setPage(PAGES.profile_page);
    } catch (err) {
      setErrorMSG(`could not login with google -- ${err.message}`);
    }
  };
  const signUp = async () => {
    let testSupervisor =
      email === "" || !emailIsValid || adminEmail === "" || !adminEmailIsValid;
    let testAdmin = email === "" || !emailIsValid;

    if (newUserPressed) {
      if (role === "Supervisor" && testSupervisor) return;
      if (role === "Administrator" && testAdmin) return;

      try {
        setLoading(true);
        const newUser = await createNewUser(email, password); //create new user
        let adminName = role !== "Administrator" ? adminEmail : newUser;

        //save admin email to local storage
        localStorage.setItem("adminName", JSON.stringify(adminName));

        addAdmin(adminName); //adding admin to db
        addNewUserToDB(adminName, newUser); //add to db first time user
        setProfileInfo(adminName, newUser, {
          firstName: "",
          lastName: "",
          email: newUser,
        });
        setPreferences(adminName, newUser, { cardView: "false" });
        setUser(newUser); //set the user as active
        setAdmin(adminName);
        setPage(PAGES.profile_page); //set page to profile page on first login
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMSG(`could not sign in -- ${err.message}`);
      }
    }
    if (!newUserPressed) {
      setNewUserPressed(true);
      setButtonText(`Sign Up`);
    }
  };
  const login = async () => {
    if (existingUserPressed) {
      if (email.trim().length < 1 || !emailIsValid) return;

      try {
        setLoading(true);
        setUser(await signInUser(email, password)); //set user, by email address
        setAdmin(adminEmail); //existing user, we need to find out who is the admin linked to the email

        //save admin email to local storage
        localStorage.setItem("adminName", JSON.stringify(adminEmail));

        setPage(PAGES.dashboard_page); //go to landing page after signing in
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorMSG(`could not login -- ${err.message}`);
      }
    }
    if (!existingUserPressed) {
      setExistingUserPressed(true);
      setExistingUserTxt("login");
    }
  };
  const resetPressed = () => {
    setExistingUserPressed(false);
    setNewUserPressed(false);
    setButtonText(`New User`);
    setExistingUserTxt("Exisiting User");
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
            elevation={3}
          >
            <Typography align="center" sx={{ textDecoration: "underline" }}>
              Sign In
            </Typography>
            <br />
            <Grid container columnSpacing={1}>
              {newUserPressed && (
                <>
                  <Role
                    setAdminEmailHandler={setAdminEmailHandler}
                    adminEmailIsValid={adminEmailIsValid}
                    roleHandler={roleHandler}
                    role={role}
                  />
                  <GoogleOption />
                  <SigninInputs
                    setEmailHandler={setEmailHandler}
                    emailIsValid={emailIsValid}
                    setPasswordHandler={setPasswordHandler}
                  />
                </>
              )}
              {existingUserPressed && (
                <>
                  <Role
                    setAdminEmailHandler={setAdminEmailHandler}
                    adminEmailIsValid={adminEmailIsValid}
                    roleHandler={roleHandler}
                    role={role}
                  />
                  <GoogleOption />
                  <SigninInputs
                    setEmailHandler={setEmailHandler}
                    emailIsValid={emailIsValid}
                    setPasswordHandler={setPasswordHandler}
                  />
                </>
              )}
            </Grid>
            {!newUserPressed && (
              <Button
                sx={{ mb: 1, mt: 1 }}
                variant="contained"
                fullWidth
                onClick={login}
              >
                {existingUserTxt}
              </Button>
            )}
            {!existingUserPressed && (
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
            {(existingUserPressed || newUserPressed) && (
              <Button onClick={resetPressed}>back</Button>
            )}
          </Card>
        </Grid>
      </Grid>
      {errorMSG && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {errorMSG}
        </Alert>
      )}
    </>
  );
};

export default LoginCard;
