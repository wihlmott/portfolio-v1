import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import classes from './Statsbar.module.css'

const Statsbar = () => {
    return <div className={classes.statsbar}>
        <Paper className={classes.progress}>
            <Typography variant='h8' color={'grey'} borderBottom={'1px solid grey'}>progress</Typography>
        </Paper>
        <Paper className={classes.history}>
            <Typography variant='h8' color={'grey'} borderBottom={'1px solid grey'}>history</Typography>
        </Paper>
    </div>
}

export default Statsbar;