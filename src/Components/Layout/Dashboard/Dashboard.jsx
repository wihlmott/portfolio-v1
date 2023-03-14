import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { retrieveAllEducators } from '../../../Firebase';
import EducatorBtn from './EducatorBtn';

const educators_dummy = [{firstname: 'Starr', lastname: 'Hendricks', section: '11E1', email: 'starr@email.com'}, {firstname: 'Wihl', lastname: 'Valentine', section: '11E4', email: 'wihl@email.com'}]

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [namesList, setNamesList] = useState();

    useEffect(()=>{
        retrieveAllEducators('admin').then((res)=>{
        setNamesList(res);
        setLoading(false);
        });
    },[])

    return (
        <Grid container spacing={1}>
        {!loading && namesList.map((el)=>{
            return (
            <Grid item xs={12} md={12}>
                <EducatorBtn educator={el} key={el}/>
            </Grid>)})}
        </Grid>
    )
}

export default Dashboard;