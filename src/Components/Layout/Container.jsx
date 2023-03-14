import { useContext } from 'react';
import {PageContext} from '../Context/Context';
import Dashboard from './Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import NewEntryForm from '../NewEntryForm/NewEntryForm';
import classes from './Container.module.css';
import Banner from './Container/Banner';
import CheckForm from '../Forms/CheckForm';
import { AssessmentCheckFormQuestions, FORMS, PAGES, PlanningCheckFormQuestions } from '../Config';
import EducatorProfile from '../EducatorProfile/EducatorProfile';
import LoginCard from '../LoginCard';

const Container = () => {
    const [page, _] = useContext(PageContext);
    
    return <div className={classes.container}>
        {page === PAGES.login_page && <LoginCard/>}
        {page === PAGES.banner_page && <Banner/>}
        {page === PAGES.new_educator_form && <NewEntryForm/>}
        {page === PAGES.dashboard_page && <Dashboard/>}
        {page === PAGES.profile_page && <Profile/>}
        {page === PAGES.educator_profile_page && <EducatorProfile/>}
        {page === FORMS.assessment_check_form && <CheckForm formType={`Assessment File Check`} formQuestions={AssessmentCheckFormQuestions}/>}
        {page === FORMS.planning_check_form && <CheckForm formType={`Planning File Check`} formQuestions={PlanningCheckFormQuestions}/>}
    </div>
}

export default Container;