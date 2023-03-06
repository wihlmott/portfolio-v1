import { useContext } from 'react';
import {PageContext, EducatorContext} from '../../Context/Context';
import classes from './EducatorBtn.module.css'

const EducatorBtn = (props) => {
    const [page, setPage] = useContext(PageContext);
    const [educator, setEducator] = useContext(EducatorContext);

    const name = `${props.educator.firstname} ${props.educator.lastname}`;

    const clickHandler = (e) => {
        setPage(e.target.dataset.type);
        setEducator(props.educator);
    }

    return(
    <div className={classes.educatorBtn}>
        <span>{name}</span>
        <span>{` -- ${props.educator.section}`}</span>
        <span className={classes.buttons} onClick={clickHandler}>
            <span className={classes.icons} data-type={'ASSESSMENT_CHECK_FORM'}>ACF</span>
            <span className={classes.icons}>icon2</span>
            <span className={classes.icons}>icon3</span>
        </span>
    </div>)
}

export default EducatorBtn;