import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { PAGES } from "../Config";
import { EntryContext, PageContext } from "../Context/Context";
import classes from "./EntriesBtn.module.css";

const EntriesBtn = (props) => {
  const [page, setPage] = useContext(PageContext);
  const [entry, setEntry] = useContext(EntryContext);

  const displayEntryHandler = () => {
    setEntry({ entry: props.entry, type: props.type });
    setPage(PAGES.entry_page);
  };

  return (
    <Paper className={classes.entries} onClick={displayEntryHandler}>
      {props.entry.id}
    </Paper>
  );
};

export default EntriesBtn;
