import { useContext } from 'react';
import {PageContext, EducatorContext} from '../../Context/Context';
import classes from './EducatorBtn.module.css'

const EducatorBtn = (props) => {
    const [page, setPage] = useContext(PageContext);
    const [educator, setEducator] = useContext(EducatorContext);

    const name = `${props.educator.firstname} ${props.educator.lastname}`;

    const clickHandler = (e) => {
        setEducator(props.educator);
        if(!e.target.dataset.type)return setPage('EDUCATOR_PROFILE_PAGE');
        setPage(e.target.dataset.type);
    }

    return(
    <div className={classes.educatorBtn} onClick={clickHandler}>
        <span>{name}</span>
        <span>{` -- ${props.educator.section}`}</span>
        <span className={classes.buttons}>
            <span className={classes.icons} data-type={'ASSESSMENT_CHECK_FORM'}>ACF</span>
            <span className={classes.icons} data-type={'PLANNING_CHECK_FORM'}>PCF</span>
            <span className={classes.icons}>icon3</span>
        </span>
    </div>)
}

export default EducatorBtn;