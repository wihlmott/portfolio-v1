import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useContext, useEffect, useState } from "react";
import { PageContext, UserContext } from "../Context/Context";
import {
  retrieveProfileInfo,
  setProfileInfo,
  signOutUser,
} from "../../Firebase";
import { PAGES, themeStyles1 } from "../Config";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educatorState, setEducatorState] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    retrieveProfileInfo(user).then((res) => {
      setEducatorState({
        firstname: res.firstName,
        lastname: res.lastName,
        email: user,
      });
    });
  }, [page === PAGES.profile_page]);

  const firstnameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastnameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      await setProfileInfo(user, {
        firstName: firstName,
        lastName: lastName,
        email: user,
      });
    } catch (err) {
      alert(`could not set profile -- ${err.message}`);
    }
    setPage(PAGES.dashboard_page);
  };
  const closeForm = () => {
    setPage(PAGES.dashboard_page);
  };

  const logoutHandler = () => {
    signOutUser().then((res) => {
      setPage(PAGES.login_page);
      setUser("guest");
    });
  };

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
              label="Email"
              value={educatorState.email}
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
    </Card>
  );
};

export default Profile;
