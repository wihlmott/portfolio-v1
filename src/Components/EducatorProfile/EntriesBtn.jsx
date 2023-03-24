import Paper from "@mui/material/Paper";
import classes from "./EntriesBtn.module.css";

const EntriesBtn = ({ type, entry }) => {
  const displayEntryHandler = () => {
    console.log(type, entry);
  };

  return (
    <Paper className={classes.entries} onClick={displayEntryHandler}>
      {entry.id}
    </Paper>
  );
};

export default EntriesBtn;
