import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import {
  retrieveAllEducators,
  retrievePreferences,
  setPreferences,
} from "../../../Firebase";
import { AdminContext, UserContext } from "../../Context/Context";
import EducatorBtn from "./EducatorBtn";
import EducatorCard from "./EducatorCard";

const Dashboard = () => {
  const [user] = useContext(UserContext);
  const [admin, setAdmin] = useContext(AdminContext);

  const [loading, setLoading] = useState(true);
  const [namesList, setNamesList] = useState([]);
  const [errorMSG, setErrorMSG] = useState();

  const [sortBy, setSortBy] = useState("123");
  const [cardView, setCardView] = useState();

  useEffect(() => {
    (async () => {
      try {
        setAdmin(JSON.parse(localStorage.getItem("adminName")));

        const preferences = await retrievePreferences(admin, user);
        setCardView(preferences.cardView);
      } catch (err) {
        console.log(`could not load preferences -- ${err.message}`);
      }
    })();

    retrieveAllEducators(JSON.parse(localStorage.getItem("adminName")), user)
      .then((res) => {
        setNamesList(res);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMSG(`could not load educators -- ${err.message}`);
        setLoading(false);
      });
  }, []);

  const sortByHandler = () => {
    const options = ["123", "A-Z", "Z-A"];
    if (sortBy === options[0]) {
      setSortBy(() => options[1]);
      setNamesList((prev) =>
        prev.sort((a, b) =>
          a.trim().split("-")[1] > b.trim().split("-")[1] ? 1 : -1
        )
      );
    }
    if (sortBy === options[1]) {
      setSortBy(() => options[2]);
      setNamesList((prev) =>
        prev.sort((a, b) =>
          a.trim().split("-")[1] > b.trim().split("-")[1] ? -1 : 1
        )
      );
    }
    if (sortBy === options[2]) {
      setSortBy(() => options[0]);
      setNamesList((prev) => prev.sort());
    }
  };
  const viewHandler = () => {
    setCardView(() => {
      setPreferences(admin, user, { cardView: !cardView });
      return !cardView;
    });
  };

  return (
    <>
      {loading && <LinearProgress />}
      <Grid container spacing={1} mt={0.1}>
        <Typography pl={1} color="grey" align="center" width="100%">
          {namesList.length === 0 ? "no educators added" : ""}
        </Typography>
        {!loading &&
          namesList.map((el) => {
            if (!cardView)
              return (
                <Grid item xs={12} md={12} key={el}>
                  <EducatorBtn educator={el} />
                </Grid>
              );
            if (cardView)
              return (
                <Grid item xs={6} md={6} key={el}>
                  <EducatorCard educator={el} />
                </Grid>
              );
          })}
      </Grid>
      {errorMSG && <Alert severity="error">{errorMSG}</Alert>}
      <Toolbar>
        <Button sx={{ ml: "auto" }} onClick={sortByHandler}>
          <Typography sx={{ color: "#fff" }}>sort {` ${sortBy}`}</Typography>
        </Button>
        <Button onClick={viewHandler}>
          <Typography sx={{ color: "#fff" }}>view</Typography>
        </Button>
      </Toolbar>
    </>
  );
};

export default Dashboard;
