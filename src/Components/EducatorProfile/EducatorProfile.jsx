import { Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { EducatorContext } from '../Context/Context';
import classes from './EducatorProfile.module.css'
import EntriesBtn from './EntriesBtn';

const randomEntry = [{data:'date from 23Jan2023', date:'23Jan2023'}, {data:'data from 27Jan2023', date:'27Jan2023'}, {data:'data from 03Feb2023', date:'03Feb2023'}]

const EducatorProfile = () => {
    const [educator, setEducator] = useContext(EducatorContext);
    const name = `${educator.firstname} ${educator.lastname}`;

    return <div>
        <div className={classes.profileHeader}>{name}</div>
        <Paper className={classes.leftForms}>
            <Typography variant='h8' borderBottom={'1px solid grey'}>Assessment File checks</Typography>
            {randomEntry.map((el)=>{
                return <EntriesBtn entry={el} key={el.date}/>})}
        </Paper>
        <Paper className={classes.rightForms}>
            <Typography variant='h8' borderBottom={'1px solid grey'}>Planning File checks</Typography>
        </Paper>
    </div>
}

export default EducatorProfile;