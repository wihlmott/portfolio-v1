import classes from './Sidebar.module.css'
import SidebarBtn from './Sidebar/SidebarBtn';

const Sidebar = () => {
    const page = 'page';

    return <div className={classes.sidebar}>
        {page !== 'profile' && <div className={classes.profilePic}></div>}
        <SidebarBtn/>
    </div>
}

export default Sidebar;