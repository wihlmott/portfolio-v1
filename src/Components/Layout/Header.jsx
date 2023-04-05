import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Context";
import { retrieveProfileInfo } from "../../Firebase";
import { PAGES } from "../Config";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [name, setName] = useState("user");

  useEffect(() => {
    retrieveProfileInfo(user)
      .then((res) => setName(res.firstName))
      .catch((err) => console.log(`no user logged in`));
  }, [user]);

  const profileOptionsHandler = () => {
    console.log(`sign out or change display picture`);
  };

  if (user === "guest") return;
  return (
    <AppBar>
      <Grid container>
        <Grid item xs={10} md={10}>
          {`welcome ${name}`}
        </Grid>
        <Grid item xs={2} md={2}>
          <AccountCircleIcon onClick={profileOptionsHandler} />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
