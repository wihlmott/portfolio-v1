import classes from './Dashboard.module.css'
import EducatorBtn from './EducatorBtn';

const educators_dummy = [{firstname: 'Starr', lastname: 'Hendricks', section: '11E1', email: 'starr@email.com'}, {firstname: 'Wihl', lastname: 'Valentine', section: '11E4', email: 'wihl@email.com'}]

const Dashboard = () => {
    return <div className={classes.dashboard}>
        {educators_dummy.map((el)=>{return <EducatorBtn educator={el} key={el.firstname}/>})}
    </div>
}

export default Dashboard;