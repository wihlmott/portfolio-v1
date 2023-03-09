import { Paper } from "@mui/material";
import classes from './EntriesBtn.module.css';

const EntriesBtn = ({entry}) => {
    const displayEntryHandler = () => {
        console.log(entry.data);
    }

    return <Paper className={classes.entries} onClick={displayEntryHandler}>{entry.date}</Paper>
}

export default EntriesBtn;