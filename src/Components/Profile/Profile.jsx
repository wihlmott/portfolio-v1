import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
// import InfoStrip from "./InfoStrip";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { UserContext } from "../Context/Context";

// const profile_dummy = {
//   firstName: "wihl",
//   lastName: "valentine",
//   email: "test@email.com",
//   cell: "021 987 9879",
// };

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  //   const entries = Object.entries(profile_dummy);

  const firstnameChangeHandler = (e) => {
    console.log(e.target.value);
  };
  const lastnameChangeHandler = (e) => {
    console.log(e.target.value);
  };

  const formSubmit = () => {
    console.log(`submit data`);
  };
  const closeForm = () => {
    console.log(`close form`);
  };
  const logoutHandler = () => {
    console.log(`logout user`);
  };

  return (
    <div>
      {/* {entries.map((el) => {
        return <InfoStrip infoTitle={el[0]} information={el[1]} key={el[0]} />;
      })} */}
      <form onSubmit={formSubmit}>
        <Typography variant="h6" align="center">
          Profile Details
        </Typography>

        <Grid container>
          <Grid item xs={12} md={5}>
            <TextField
              id="firstname"
              variant="standard"
              label="First Name *"
              onChange={firstnameChangeHandler}
              //   value={userState.firstname}
              //   error={!userState.firstnameIsValid}
            />
            <br />
            <TextField
              id="lastname"
              variant="standard"
              label="Last Name *"
              onChange={lastnameChangeHandler}
              //   error={!userState.lastnameIsValid}
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
    </div>
  );
};

export default Profile;
