import Card from "@mui/material/Card";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import { retrieveDocs } from "../../Firebase";
import { EducatorContext, PageContext, UserContext } from "../Context/Context";
import classes from "./EducatorProfile.module.css";
import EntriesBtn from "./EntriesBtn";
import { PAGES, themeStyles1 } from "../Config";

const EducatorProfile = () => {
  //more forms, left right won't work. option to display all, or drop down of options to show

  const [user, setUser] = useContext(UserContext);

  const [educator, setEducator] = useContext(EducatorContext);
  const [page, setPage] = useContext(PageContext);
  const [loadingLeft, setLoadingLeft] = useState(true);
  const [loadingRight, setLoadingRight] = useState(true);

  //retrieve all entries
  const [AFCentries, setAFCEntries] = useState();
  const [PFCentries, setPFCEntries] = useState();

  useEffect(() => {
    retrieveDocs(user, educator, "Assessment File Check").then((res) => {
      setAFCEntries(res);
      setLoadingLeft(false);
    });
    retrieveDocs(user, educator, "Planning File Check").then((res) => {
      setPFCEntries(res);
      setLoadingRight(false);
    });
  }, []);

  const updateProfilePage = () => setPage(PAGES.update_educator_form);

  return (
    <>
      <Toolbar
        sx={{
          background: themeStyles1.toolbarColor,
          color: "white",
        }}
      >
        <Typography>{educator}</Typography>
        <SettingsIcon
          onClick={updateProfilePage}
          data-type={"UPDATE_EDUCATOR_FORM"}
          sx={{
            m: "-10px",
            ml: "auto",
            fontSize: "3rem",
            p: "10px",
            cursor: "pointer",
          }}
        />
      </Toolbar>

      <Card className={classes.leftForms} elevation={0}>
        {loadingLeft && <LinearProgress />}
        <Typography variant="body2" borderBottom={"1px solid grey"}>
          Assessment File checks
        </Typography>
        <Grid container spacing={1}>
          {!loadingLeft &&
            AFCentries.map((el) => {
              return (
                <Grid item xs={12} md={12} key={el.id}>
                  <EntriesBtn type={"Assessment File Check"} entry={el} />
                </Grid>
              );
            })}
        </Grid>
      </Card>
      <Card className={classes.rightForms} elevation={0}>
        {loadingRight && <LinearProgress />}
        <Typography variant="body2" borderBottom={"1px solid grey"}>
          Planning File checks
        </Typography>
        <Grid container spacing={1}>
          {!loadingRight &&
            PFCentries.map((el) => {
              return (
                <Grid item xs={12} md={12} key={el.id}>
                  <EntriesBtn type={"Planning File Check"} entry={el} />
                </Grid>
              );
            })}
        </Grid>
      </Card>
    </>
  );
};

export default EducatorProfile;
