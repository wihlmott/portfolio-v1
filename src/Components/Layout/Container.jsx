import { useContext } from 'react';
import {PageContext} from '../Context/Context';
import Dashboard from './Dashboard/Dashboard';
import NewEntryForm from '../NewEntryForm/NewEntryForm';
import classes from './Container.module.css';
import Banner from './Container/Banner';
import CheckForm from '../Forms/CheckForm';
import { AssessmentCheckFormQuestions, PlanningCheckFormQuestions } from '../Config';
import EducatorProfile from '../EducatorProfile/EducatorProfile';

const Container = () => {
    const [page, _] = useContext(PageContext);
    
    return <div className={classes.container}>
        {page === 'BANNER_PAGE' && <Banner/>}
        {page === 'NEW_EDUCATOR_FORM' && <NewEntryForm/>}
        {page === 'DASHBOARD_PAGE' && <Dashboard/>}
        {page === 'EDUCATOR_PROFILE_PAGE' && <EducatorProfile/>}
        {page === 'ASSESSMENT_CHECK_FORM' && <CheckForm formType={`Assessment File Check`} formQuestions={AssessmentCheckFormQuestions}/>}
        {page === 'PLANNING_CHECK_FORM' && <CheckForm formType={`Planning File Check`} formQuestions={PlanningCheckFormQuestions}/>}
    </div>
}

export default Container;