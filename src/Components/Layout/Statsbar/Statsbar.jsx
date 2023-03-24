import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import classes from './Statsbar.module.css'
import LinearProgress from '@mui/material/LinearProgress';
import { useContext, useEffect, useState } from 'react';
import { retrieveAllEducators, retriveHistory } from '../../../Firebase';
import { UserContext } from '../../Context/Context';

// const completedData_dummy = [{educator: 'starr hendricks', data: '', date:'23Feb2023'}]
// let totalAmount = 2;
// const progress = (completedData_dummy.length/totalAmount)*100;

const Statsbar = () => {
    const [user, setUser] = useContext(UserContext);

    const [history, setHistory] = useState();
    const [progressAssessment, setProgressAssessment] = useState();
    const [progressPlanning, setProgressPlanning] = useState();
    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        retriveHistory(user).then(retrievedHistory=>{
            if(retrievedHistory === undefined)return;

            retrieveAllEducators(user).then(allEducators=>{
                setTotal(allEducators.length-1);
                setHistory(retrievedHistory);
                let countAssessment = 0;
                let countPlanning = 0;
                Object.keys(retrievedHistory).forEach((el)=>{
                    if(el.includes('Assessment'))countAssessment++;
                    if(el.includes('Planning'))countPlanning++;
                })
                console.log(countAssessment, countPlanning);
    
                setProgressAssessment((countAssessment/total)*100);
                setProgressPlanning((countPlanning/total)*100);
                setLoading(false);
                });
            });

        console.log(progressAssessment, progressPlanning);
    },[user]);

    if(!history) return;

    return (<div className={classes.statsbar}>
        <Paper className={classes.progress}>
            <Typography color={'rgba(128, 128, 128, 0.7)'} borderBottom={'0.1px solid rgba(128, 128, 128, 0.2)'}>progress</Typography>
            <br/>
            {!loading && <div className={classes.progressBarONE}>
                <Typography variant='subtitle' color={'grey'} m={1}>Assessment File forms progress - {progressAssessment}%</Typography>
                <LinearProgress variant='determinate' value={progressAssessment}/>
            </div>}
            <br/>
            {!loading && <div className={classes.progressBarTWO}>
                <Typography variant='subtitle' color={'grey'} m={1}>Planning File forms progress - {progressPlanning}%</Typography>
                <LinearProgress variant='determinate' value={progressPlanning}/>
            </div>}
        </Paper>
        <Paper className={classes.history}>
            <Typography color={'rgba(128, 128, 128, 0.7)'} borderBottom={'1px solid rgba(128, 128, 128, 0.2)'}>history</Typography>
            {/* {completedData_dummy.map((el)=>{
                return <div className={classes.historyTxt} key={`${el.educator}--${el.date}`}>
                    <Typography variant='subtitle' color={'grey'}>{`${el.educator} -- ${el.date}` }</Typography>
                    <br/>
                    </div>
            })} */}
            {!loading && Object.entries(history).map((el)=>{
                return <div className={classes.historyTxt} key={`${el[0]}--${el[1]}`}>
                    <Typography variant='subtitle' color={'grey'}>{`${el[0]} -- ${el[1]}` }</Typography>
                    <br/>
                    </div>
            })}
        </Paper>
    </div>)
}

export default Statsbar;