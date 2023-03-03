import classes from './Sidebar.module.css'
import Button from '@mui/material/Button';
import { useContext } from 'react';
import PageContext from '../../Context/Context';

const Sidebar = () => {
    const [page, setPage] = useContext(PageContext);

    const openFormHandler = () => {
        setPage('NEW_EDUCATOR_FORM');
    }
    const openDashboardHandler = () => {
        setPage('DASHBOARD_PAGE');
    }

    return <div className={classes.sidebar}>
        <div className={classes.profilePic}></div>
        <Button variant='contained' fullWidth onClick={openDashboardHandler}>dashboard</Button>
        <Button variant='contained' fullWidth  onClick={openFormHandler}>new educator</Button>
    </div>
}

export default Sidebar;