import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import classes from './InfoStrip.module.css';
import { useState } from 'react';

const InfoStrip = ({infoTitle, information}) => {
    const [info, setInfo] = useState(information);

    const infoChangeHandler = (e) => {
        setInfo(e.target.value);
    }

    return <div className={classes.infoStrip}>
        <Grid container>
            <Grid item xs={6} md={5}>
                <Typography sx={{pt:1, color: '#757575', padding:1}}>{infoTitle}</Typography>
            </Grid>
            <Grid item xs={6} md={5}>
                <TextField value={info} size='small' onChange={infoChangeHandler}></TextField>
            </Grid>
        </Grid>

    </div>
}

export default InfoStrip;