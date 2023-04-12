import classes from "./Sidebar.module.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import {
  EducatorContext,
  PageContext,
  UserContext,
} from "../../Context/Context";
import { PAGES, themeStyles1 } from "../../Config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CollectionsIcon from "@mui/icons-material/Collections";
import PortraitIcon from "@mui/icons-material/Portrait";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const Sidebar = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);
  const [size, setSize] = useState(window.innerWidth);

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    color: themeStyles1.buttonColor,
  };
  const buttonStyleActive = {
    display: "flex",
    flexDirection: "column",
    color: themeStyles1.buttonColor,
    backgroundColor: "rgba(211,211,211,0.5)",
  };

  const openFormHandler = () => {
    if (user === "guest") return;
    //reset educator
    setEducator("");
    setPage(PAGES.new_educator_form);
  };
  const openDashboardHandler = () => {
    if (user === "guest") return;
    setPage(PAGES.dashboard_page);
  };
  const openProfileHandler = () => {
    if (user === "guest") return;
    setPage(PAGES.profile_page);
  };
  const openHistoryHandler = () => {
    if (user === "guest") return;
    setPage(PAGES.history_page);
  };

  const handleResize = () => {
    setSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.sidebar}>
      {size > 500 && (
        <AccountCircleIcon
          sx={{
            fontSize: "10rem",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            color: themeStyles1.buttonColor,
          }}
        />
      )}
      {size < 500 && (
        <Grid
          container
          sx={{
            position: "fixed",
            bottom: "0",
            background: "#fff",
            zIndex: "2",
          }}
        >
          <Grid item xs={3}>
            <Button
              sx={page === PAGES.profile_page ? buttonStyleActive : buttonStyle}
              fullWidth
              onClick={openProfileHandler}
            >
              <PortraitIcon sx={{ mr: 1, fontSize: "2.7rem" }} />
              <Typography variant="subtitle">profile</Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={page === PAGES.history_page ? buttonStyleActive : buttonStyle}
              fullWidth
              onClick={openHistoryHandler}
            >
              <AutoStoriesIcon sx={{ mr: 1, fontSize: "2.7rem" }} />
              <Typography variant="subtitle">History</Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={
                page === PAGES.dashboard_page ? buttonStyleActive : buttonStyle
              }
              fullWidth
              onClick={openDashboardHandler}
            >
              <CollectionsIcon sx={{ mr: 1, fontSize: "2.7rem" }} />
              <Typography variant="subtitle">Educators</Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={
                page === PAGES.new_educator_form
                  ? buttonStyleActive
                  : buttonStyle
              }
              fullWidth
              onClick={openFormHandler}
            >
              <PersonAddIcon sx={{ mr: 1, fontSize: "2.7rem" }} />
              <Typography variant="subtitle">Add</Typography>
            </Button>
          </Grid>
        </Grid>
      )}

      {size > 500 && (
        <Grid container>
          <Button
            sx={{ mt: 0.6, backgroundColor: themeStyles1.buttonColor }}
            variant="contained"
            fullWidth
            onClick={openProfileHandler}
          >
            <PortraitIcon sx={{ mr: 1 }} />
            profile
          </Button>
          <Button
            sx={{ mt: 0.6, backgroundColor: themeStyles1.buttonColor }}
            variant="contained"
            fullWidth
            onClick={openDashboardHandler}
          >
            <CollectionsIcon sx={{ mr: 1 }} />
            dashboard
          </Button>
          <Button
            sx={{ mt: 0.6, backgroundColor: themeStyles1.buttonColor }}
            variant="contained"
            fullWidth
            onClick={openFormHandler}
          >
            <PersonAddIcon sx={{ mr: 1 }} />
            new educator
          </Button>
        </Grid>
      )}
    </div>
  );
};

export default Sidebar;
