import { useEffect, useState } from "react";
import HistoryPage from "./HistoryPage";
import classes from "./Statsbar.module.css";

const Statsbar = () => {
  //handling small screen options
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

  if (size < 500) return;
  return (
    <div className={classes.statsbar}>
      <Paper className={classes.history}>
        <HistoryPage />;
      </Paper>
    </div>
  );
};

export default Statsbar;
