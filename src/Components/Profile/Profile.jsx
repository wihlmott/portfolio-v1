import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { PageContext, UserContext } from "../Context/Context";
import {
  retrieveProfileInfo,
  setProfileInfo,
  signOutUser,
} from "../../Firebase";
import { PAGES } from "../Config";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [labelFirstName, setLabelFirstName] = useState("First Name");
  const [labelLastName, setLabelLastName] = useState("Last Name");

  useEffect(() => {
    retrieveProfileInfo(user).then((res) => {
      setFirstName(res.firstName);
      setLastName(res.lastName);

      setLabelFirstName("");
      setLabelLastName("");
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

  return (
    <>
      <form onSubmit={formSubmit}>
        <Typography variant="h6" align="center">
          Profile Details
        </Typography>

        <Grid container rowSpacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              id="firstname"
              variant="standard"
              label={labelFirstName}
              onChange={firstnameChangeHandler}
              value={firstName}
            />
            <br />
            <TextField
              id="lastname"
              variant="standard"
              label={labelLastName}
              onChange={lastnameChangeHandler}
              value={lastName}
            />
          </Grid>
          <br />
          <Grid item xs={12} md={5}>
            <TextField
              id="email"
              variant="standard"
              label="Email"
              value={user}
            />
          </Grid>
        </Grid>
        <br />

        <Button sx={{ m: 1 }} variant="contained" type="submit">
          save
        </Button>
        <br />
        <Button
          sx={{ m: 1 }}
          variant="contained"
          display="flex"
          justifyContent="flex-end"
          onClick={closeForm}
        >
          close
        </Button>
        <br />
        <Button sx={{ m: 1 }} variant="contained" onClick={logoutHandler}>
          logout
        </Button>
      </form>
    </>
  );
};

export default Profile;
