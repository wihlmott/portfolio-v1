import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import classes from './Statsbar.module.css'
import LinearProgress from '@mui/material/LinearProgress';

const completedData_dummy = [{educator: 'starr hendricks', data: '', date:'23Feb2023'}]
let totalAmount = 2;
const progress = (completedData_dummy.length/totalAmount)*100;

const Statsbar = () => {
    return <div className={classes.statsbar}>
        <Paper className={classes.progress}>
            <Typography color={'rgba(128, 128, 128, 0.7)'} borderBottom={'0.1px solid rgba(128, 128, 128, 0.2)'}>progress</Typography>
            <br/>
            <div className={classes.progressBarONE}>
                <Typography variant='subtitle' color={'grey'} m={1}>Assessment File forms progress</Typography>
                <LinearProgress variant='determinate' value={progress}/>
            </div>
            <br/>
            <div className={classes.progressBarTWO}>
                <Typography variant='subtitle' color={'grey'} m={1}>Planning File forms progress</Typography>
                <LinearProgress variant='determinate' value={progress}/>
            </div>
        </Paper>
        <Paper className={classes.history}>
            <Typography color={'rgba(128, 128, 128, 0.7)'} borderBottom={'1px solid rgba(128, 128, 128, 0.2)'}>history</Typography>
            {completedData_dummy.map((el)=>{
                return <div className={classes.historyTxt} key={`${el.educator}--${el.date}`}>
                    <Typography variant='subtitle' color={'grey'}>{`${el.educator} -- ${el.date}` }</Typography>
                    <br/>
                    </div>
            })}
        </Paper>
    </div>
}

export default Statsbar;