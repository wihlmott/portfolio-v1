import classes from './EducatorBtn.module.css'

const EducatorBtn = ({educator}) => {
    const name = `${educator.firstname} ${educator.lastname}`;

    const clickHandler = (e) => {
        console.log(e.target.innerHTML);
    }

    return(
    <div className={classes.educatorBtn}>
        <span>{name}</span>
        <span>{` -- ${educator.section}`}</span>
        <span className={classes.buttons} onClick={clickHandler}>
            <span className={classes.icons}>icon1</span>
            <span className={classes.icons}>icon2</span>
            <span className={classes.icons}>icon3</span>
        </span>
    </div>)
}

export default EducatorBtn;