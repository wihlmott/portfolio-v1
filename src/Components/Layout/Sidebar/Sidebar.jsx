import classes from './Sidebar.module.css'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';
import {PageContext} from '../../Context/Context';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PortraitIcon from '@mui/icons-material/Portrait';

const Sidebar = () => {
    const [page, setPage] = useContext(PageContext);
    const [size, setSize] = useState(window.innerWidth);

    const openFormHandler = () => {
        setPage('NEW_EDUCATOR_FORM');
    }
    const openDashboardHandler = () => {
        setPage('DASHBOARD_PAGE');
    }
    const openProfileHandler = () => {
        setPage('PROFILE_PAGE');
    }

    const handleResize = () => {
        setSize(window.innerWidth);
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return ()=>{window.removeEventListener('resize', handleResize);}
    },[])

    return <div className={classes.sidebar}>
        {size>500 && <div className={classes.profilePic}></div>}
        {size<500 && <Grid container>
            <Grid item xs={4}>
                <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openProfileHandler}><PortraitIcon sx={{mr:1}}/></Button>
            </Grid>
            <Grid item xs={4}>
                <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openDashboardHandler}><CollectionsIcon sx={{mr:1}}/></Button>
            </Grid>
            <Grid item xs={4}>
                <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openFormHandler}><PersonAddIcon sx={{mr:1}}/></Button>
            </Grid>
        </Grid>}

        {size>500 && <Grid container>
            <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openProfileHandler}><PortraitIcon sx={{mr:1}}/>profile</Button>
            <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openDashboardHandler}><CollectionsIcon sx={{mr:1}}/>dashboard</Button>
            <Button sx={{ mt:0.6}} variant='contained' fullWidth  onClick={openFormHandler}><PersonAddIcon sx={{mr:1}}/>new educator</Button>
        </Grid>}
    </div>
}

export default Sidebar;