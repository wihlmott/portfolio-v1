import { useContext } from 'react';
import {PageContext} from '../Context/Context';
import Dashboard from './Dashboard/Dashboard';
import NewEntryForm from '../NewEntryForm/NewEntryForm';
import classes from './Container.module.css';
import Banner from './Container/Banner';
import AssessmentCheckForm from '../AssessmentCheckForm/AssessmentCheckForm';

const Container = () => {
    const [page, setPage] = useContext(PageContext);
    
    return <div className={classes.container}>
        {page === 'BANNER_PAGE' && <Banner/>}
        {page === 'NEW_EDUCATOR_FORM' && <NewEntryForm/>}
        {page === 'DASHBOARD_PAGE' && <Dashboard/>}
        {page === 'ASSESSMENT_CHECK_FORM' && <AssessmentCheckForm/>}
    </div>
}

export default Container;