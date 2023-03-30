import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import { retrieveDocs } from "../../Firebase";
import { EducatorContext, PageContext, UserContext } from "../Context/Context";
import classes from "./EducatorProfile.module.css";
import EntriesBtn from "./EntriesBtn";

const EducatorProfile = () => {
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

  const updateProfilePage = (e) => setPage(e.target.dataset.type);

  return (
    <>
      <Card
        elevation={2}
        sx={{
          mb: 1,
          borderRadius: 0,
          backgroundColor: "info.main",
        }}
      >
        <CardHeader
          subheader={educator}
          action={
            <IconButton>
              <SettingsIcon
                onClick={updateProfilePage}
                data-type={"UPDATE_EDUCATOR_FORM"}
                sx={{
                  m: "-10px",
                  ml: 0,
                  fontSize: "3rem",
                  p: "10px",
                }}
              />
            </IconButton>
          }
        />
      </Card>
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
