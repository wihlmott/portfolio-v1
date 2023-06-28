// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HistoryEntry from "./HistoryEntry";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import { retrieveHistory } from "../../../Firebase";
import { AdminContext, PageContext, UserContext } from "../../Context/Context";

const HistoryPage = () => {
  const [user] = useContext(UserContext);
  const [page] = useContext(PageContext);
  const [admin] = useContext(AdminContext);

  const [history, setHistory] = useState();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorMSG, setErrorMSG] = useState();

  useEffect(() => {
    if (user === "guest") {
      setHistory("");
      return;
    }
    (async () => {
      try {
        setLoadingHistory(true);
        const historyDB = await retrieveHistory(admin, user);
        setHistory(historyDB);
        setLoadingHistory(false);
      } catch (err) {
        setLoadingHistory(false);
        setErrorMSG(err.message);
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
        {!errorMSG && (
          <Typography align="center">no recorded history</Typography>
        )}
        {errorMSG && <Alert severity="error">{errorMSG}</Alert>}
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
