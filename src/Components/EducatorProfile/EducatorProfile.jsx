import { useContext } from 'react';
import { EducatorContext } from '../Context/Context';
import classes from './EducatorProfile.module.css'

const EducatorProfile = () => {
    const [educator, setEducator] = useContext(EducatorContext);
    const name = `${educator.firstname} ${educator.lastname}`;

    return <div>
        <div className={classes.profileHeader}>{name}</div>
    </div>
}

export default EducatorProfile;