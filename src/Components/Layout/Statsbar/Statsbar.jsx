import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import classes from "./Statsbar.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import { retrieveAllEducators, retrieveHistory } from "../../../Firebase";
import { PageContext, UserContext } from "../../Context/Context";

const Statsbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);

  const [history, setHistory] = useState();
  const [progressAssessment, setProgressAssessment] = useState(0);
  const [progressPlanning, setProgressPlanning] = useState(0);
  const [total, setTotal] = useState(0);

  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (user === "guest") {
      setHistory("");
      return;
    }
    (async () => {
      try {
        const historyDB = await retrieveHistory(user);
        setHistory(historyDB);
        setLoadingHistory(false);

        setTotal((await retrieveAllEducators(user)).length - 1); //only works on second run

        const amountPlanning = Object.keys(historyDB).reduce((acc, el) => {
          if (el.includes(`Planning`)) return acc + 1;
          return acc;
        }, 0);
        const amountAssessment = Object.keys(historyDB).reduce((acc, el) => {
          if (el.includes(`Assessment`)) return acc + 1;
          return acc;
        }, 0);

        console.log(amountAssessment, amountPlanning, total);
        setProgressAssessment(Math.round((amountAssessment / total) * 100));
        setProgressPlanning(Math.round((amountPlanning / total) * 100));
        setLoadingProgress(false);
      } catch (error) {
        console.log(err.message);
      }
    })();
  }, [page]);

  if (!history) return;
  return (
    <div className={classes.statsbar}>
      {loadingProgress && <LinearProgress />}
      <Paper className={classes.progress}>
        <Typography
          color={"rgba(128, 128, 128, 0.7)"}
          borderBottom={"0.1px solid rgba(128, 128, 128, 0.2)"}
        >
          progress
        </Typography>
        <br />
        {!loadingProgress && (
          <div className={classes.progressBarONE}>
            <Typography variant="subtitle" color={"grey"} m={1}>
              Assessment File forms progress - {progressAssessment}%
            </Typography>
            <LinearProgress variant="determinate" value={progressAssessment} />
          </div>
        )}
        <br />
        {!loadingProgress && (
          <div className={classes.progressBarTWO}>
            <Typography variant="subtitle" color={"grey"} m={1}>
              Planning File forms progress - {progressPlanning}%
            </Typography>
            <LinearProgress variant="determinate" value={progressPlanning} />
          </div>
        )}
      </Paper>
      {loadingHistory && <LinearProgress />}
      <Paper className={classes.history}>
        <Typography
          color={"rgba(128, 128, 128, 0.7)"}
          borderBottom={"1px solid rgba(128, 128, 128, 0.2)"}
        >
          history
        </Typography>
        {!loadingHistory &&
          Object.entries(history).map((el) => {
            return (
              <div className={classes.historyTxt} key={`${el[0]}--${el[1]}`}>
                <Typography
                  variant="subtitle"
                  color={"grey"}
                >{`${el[0]} -- ${el[1]}`}</Typography>
                <br />
              </div>
            );
          })}
      </Paper>
    </div>
  );
};

export default Statsbar;
