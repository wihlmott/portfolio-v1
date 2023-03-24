import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { UserContext } from "../Context/Context";
import classes from "./Header.module.css";

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  const profileOptionsHandler = () => {
    console.log(`sign out or change display picture`);
  };

  if (user === "guest") return;
  return (
    <div className={classes.header}>
      <Grid container>
        <Grid item xs={10} md={10}>
          {`welcome ${user}`}
        </Grid>
        <Grid item xs={2} md={2}>
          <AccountCircleIcon onClick={profileOptionsHandler} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
