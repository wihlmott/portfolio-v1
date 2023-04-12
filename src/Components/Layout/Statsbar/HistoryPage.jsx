// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HistoryEntry from "./HistoryEntry";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import { retrieveHistory } from "../../../Firebase";
import { PageContext, UserContext } from "../../Context/Context";

const HistoryPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);

  const [history, setHistory] = useState();
  const [loadingHistory, setLoadingHistory] = useState(true);

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
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [page]);

  if (!history)
    return (
      <>
        <Typography
          color={"rgba(128, 128, 128, 0.7)"}
          borderBottom={"1px solid rgba(128, 128, 128, 0.2)"}
        >
          history
        </Typography>
        {loadingHistory && <LinearProgress />}
        <Typography align="center">no recorded history</Typography>
      </>
    );

  return (
    <>
      <Typography
        color={"rgba(128, 128, 128, 0.7)"}
        borderBottom={"1px solid rgba(128, 128, 128, 0.2)"}
      >
        history
      </Typography>
      {!loadingHistory &&
        Object.entries(history).map((el) => (
          <HistoryEntry entry={el} key={el} />
        ))}
    </>
  );
};

export default HistoryPage;
