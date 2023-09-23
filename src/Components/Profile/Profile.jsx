import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import { AdminContext, PageContext, UserContext } from "../Context/Context";
import {
  createNewEducator,
  retrieveProfileInfo,
  setProfileInfo,
  signOutUser,
} from "../../Firebase";
import { PAGES, themeStyles1 } from "../Config";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const [page, setPage] = useContext(PageContext);

  const [educatorState, setEducatorState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    section: "",
    cell: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState();

  useEffect(() => {
    setLoading(true);
    retrieveProfileInfo(admin, user)
      .then((res) => {
        if (res === undefined) {
          setEducatorState((prev) => {
            return { ...prev, email: user };
          });
          setLoading(false);
        } else {
          setEducatorState({
            firstname: res.firstName,
            lastname: res.lastName,
            email: user,
            section: res.section,
            cell: res.cell,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setErrorMSG(`could not retrieve profile info -- ${err.message}`);
        setLoading(false);
      });
  }, [page === PAGES.profile_page]);

  const firstnameChangeHandler = (e) => {
    setEducatorState((prev) => {
      return { ...prev, firstname: e.target.value };
    });
  };
  const lastnameChangeHandler = (e) => {
    setEducatorState((prev) => {
      return { ...prev, lastname: e.target.value };
    });
  };
  const sectionChangeHandler = (e) => {
    setEducatorState((prev) => {
      return { ...prev, section: e.target.value };
    });
  };
  const cellChangeHandler = (e) => {
    setEducatorState((prev) => {
      return { ...prev, cell: e.target.value };
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      await setProfileInfo(admin, user, {
        firstName: educatorState.firstname,
        lastName: educatorState.lastname,
        email: user,
        section: educatorState.section,
        cell: educatorState.cell,
      });

      createNewEducator(
        admin,
        user,
        {
          firstname: educatorState.firstname,
          lastname: educatorState.lastname,
          email: user,
          section: educatorState.section,
          cell: educatorState.cell,
        },
        "000"
      );
    } catch (err) {
      setErrorMSG(`could not set new info -- ${err.message}`);
    }
    setPage(PAGES.dashboard_page);
  };

  const logoutHandler = () => {
    signOutUser().then((res) => {
      setPage(PAGES.login_page);
      setUser("guest");
    });
  };
  const closeForm = () => setPage(PAGES.dashboard_page);
  const adminSignInHandler = () => setPage(PAGES.admin_signin);

  const buttonStyle = { m: 1, backgroundColor: themeStyles1.buttonColor };

  return (
    <Card
      sx={{
        width: 320,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        p: 1,
      }}
      elevation={3}
    >
      {loading && <LinearProgress />}
      <form onSubmit={formSubmit}>
        <Typography variant="h6" align="center">
          Profile Details
        </Typography>

        <Grid container rowSpacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              id="firstname"
              variant="standard"
              label={"First Name"}
              onChange={firstnameChangeHandler}
              value={educatorState.firstname}
            />
            <br />
            <TextField
              id="lastname"
              variant="standard"
              label={"Last Name"}
              onChange={lastnameChangeHandler}
              value={educatorState.lastname}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={5}>
            <TextField
              id="email"
              variant="standard"
              label="Email (can not be changed)"
              value={educatorState.email}
            />
            <br />
            <TextField
              id="section"
              variant="standard"
              label={"Section"}
              onChange={sectionChangeHandler}
              value={educatorState.section}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={5}>
            <TextField
              id="cell"
              variant="standard"
              label={"Cell Number"}
              onChange={cellChangeHandler}
              value={educatorState.cell}
            />
          </Grid>
        </Grid>
        <br />

        <Button sx={buttonStyle} variant="contained" type="submit">
          save
        </Button>
        <br />
        <Button
          sx={buttonStyle}
          variant="contained"
          display="flex"
          justifyContent="flex-end"
          onClick={closeForm}
        >
          close
        </Button>
        <br />
        <Button sx={buttonStyle} variant="contained" onClick={logoutHandler}>
          logout
        </Button>
      </form>
      {errorMSG && <Alert severity="error">{errorMSG}</Alert>}

      <br />
      <br />
      <br />
      <Button sx={buttonStyle} variant="contained" onClick={adminSignInHandler}>
        sign in as admin
      </Button>
    </Card>
  );
};

export default Profile;
