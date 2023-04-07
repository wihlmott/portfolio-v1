import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/Context";
import { retrieveProfileInfo } from "../../Firebase";
import { PAGES } from "../Config";
import { Typography } from "@mui/material";

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

  const [size, setSize] = useState(window.innerWidth);
  const handleResize = () => {
    setSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (user === "guest") return;
  return (
    <div style={{ marginBottom: `${size > 500 ? "20px" : "10px"}` }}>
      <AppBar
        sx={{
          background:
            "linear-gradient(243deg, rgba(173,140,234,1) 36%, rgba(38,208,206,1) 100%)",
        }}
      >
        <Grid container>
          <Grid item xs={10} md={10}>
            <Typography p={1}>Welcome {name}</Typography>
          </Grid>
          <Grid item xs={2} md={2} pt={1}>
            <AccountCircleIcon onClick={profileOptionsHandler} />
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default Header;
