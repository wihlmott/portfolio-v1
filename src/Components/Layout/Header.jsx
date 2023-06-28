import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AdminContext, UserContext } from "../Context/Context";
import { retrieveProfileInfo } from "../../Firebase";
import { themeStyles1 } from "../Config";

const Header = () => {
  const [user] = useContext(UserContext);
  const [admin] = useContext(AdminContext);

  const [name, setName] = useState("user");

  useEffect(() => {
    retrieveProfileInfo(admin, user)
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
          background: themeStyles1.toolbarColor,
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
