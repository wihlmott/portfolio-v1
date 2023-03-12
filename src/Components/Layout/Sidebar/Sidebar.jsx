import classes from './Sidebar.module.css'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import {PageContext} from '../../Context/Context';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CollectionsIcon from '@mui/icons-material/Collections';
import PortraitIcon from '@mui/icons-material/Portrait';

const Sidebar = () => {
    const [page, setPage] = useContext(PageContext);

    const openFormHandler = () => {
        setPage('NEW_EDUCATOR_FORM');
    }
    const openDashboardHandler = () => {
        setPage('DASHBOARD_PAGE');
    }
    const openProfileHandler = () => {
        setPage('PROFILE_PAGE');
    }

    return <div className={classes.sidebar}>
        <div className={classes.profilePic}></div>
        <Grid container>
            <Grid item xs={0} md={12}></Grid>
        </Grid>
        <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openProfileHandler}><PortraitIcon sx={{mr:1}}/>profile</Button>
        <Button sx={{ mt:0.6}} variant='contained' fullWidth onClick={openDashboardHandler}><CollectionsIcon sx={{mr:1}}/>dashboard</Button>
        <Button sx={{ mt:0.6}} variant='contained' fullWidth  onClick={openFormHandler}><PersonAddIcon sx={{mr:1}}/>new educator</Button>
    </div>
}

export default Sidebar;