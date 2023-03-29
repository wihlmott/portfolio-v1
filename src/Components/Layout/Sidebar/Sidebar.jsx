import classes from "./Sidebar.module.css";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import {
  EducatorContext,
  PageContext,
  UserContext,
} from "../../Context/Context";
import { PAGES } from "../../Config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CollectionsIcon from "@mui/icons-material/Collections";
import PortraitIcon from "@mui/icons-material/Portrait";

const Sidebar = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);
  const [size, setSize] = useState(window.innerWidth);

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
          color="primary"
          sx={{
            fontSize: "10rem",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      )}
      {size < 500 && (
        <Grid container>
          <Grid item xs={4}>
            <Button
              sx={{ mt: 0.6 }}
              variant="contained"
              fullWidth
              onClick={openProfileHandler}
            >
              <PortraitIcon sx={{ mr: 1 }} />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ mt: 0.6 }}
              variant="contained"
              fullWidth
              onClick={openDashboardHandler}
            >
              <CollectionsIcon sx={{ mr: 1 }} />
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{ mt: 0.6 }}
              variant="contained"
              fullWidth
              onClick={openFormHandler}
            >
              <PersonAddIcon sx={{ mr: 1 }} />
            </Button>
          </Grid>
        </Grid>
      )}

      {size > 500 && (
        <Grid container>
          <Button
            sx={{ mt: 0.6 }}
            variant="contained"
            fullWidth
            onClick={openProfileHandler}
          >
            <PortraitIcon sx={{ mr: 1 }} />
            profile
          </Button>
          <Button
            sx={{ mt: 0.6 }}
            variant="contained"
            fullWidth
            onClick={openDashboardHandler}
          >
            <CollectionsIcon sx={{ mr: 1 }} />
            dashboard
          </Button>
          <Button
            sx={{ mt: 0.6 }}
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
