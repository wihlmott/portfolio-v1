import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import { retrieveAllEducators } from "../../../Firebase";
import { UserContext } from "../../Context/Context";
import EducatorBtn from "./EducatorBtn";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [namesList, setNamesList] = useState([]);
  const [errorMSG, setErrorMSG] = useState();

  const [sortBy, setSortBy] = useState("123");
  const [view, setView] = useState("list");

  useEffect(() => {
    retrieveAllEducators(user)
      .then((res) => {
        setNamesList(res);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMSG(err.message);
        setLoading(false);
      });
  }, []);

  const sortByHandler = () => {
    const options = ["123", "A-Z", "Z-A"];
    if (sortBy === options[0]) {
      setSortBy((prev) => options[1]);
      setNamesList((prev) =>
        prev.sort((a, b) =>
          a.trim().split("-")[1] > b.trim().split("-")[1] ? 1 : -1
        )
      );
    }
    if (sortBy === options[1]) {
      setSortBy((prev) => options[2]);
      setNamesList((prev) =>
        prev.sort((a, b) =>
          a.trim().split("-")[1] > b.trim().split("-")[1] ? -1 : 1
        )
      );
    }
    if (sortBy === options[2]) {
      setSortBy((prev) => options[0]);
      setNamesList((prev) => prev.sort());
    }
  };
  const viewHandler = () => {
    const options = ["list", "card"];
    if (view === options[0]) setView(options[1]);
    if (view === options[1]) setView(options[0]);
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
            if (el === "history") return;
            if (el === "details") return;
            return (
              <Grid item xs={12} md={12} key={el}>
                <EducatorBtn educator={el} />
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
