import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar/Sidebar';
import Container from './Layout/Container';
import Statsbar from './Layout/Statsbar/Statsbar';
import Footer from './Layout/Footer'
import Grid from '@mui/system/Unstable_Grid';
import Paper from '@mui/material/Paper';
import {EducatorContext, PageContext} from './Context/Context'
import { useState } from 'react';

const Layout = () => {
    const [page, setPage] = useState('LOGIN_PAGE');
    const [educator, setEducator] = useState('');

    return <div>
        <PageContext.Provider value={[page, setPage]}>
        <EducatorContext.Provider value={[educator, setEducator]}>
        <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item xs={12} md={12}>
                    <Paper>
                        <Header/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Paper>
                        <Sidebar/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6.5}>
                    <Paper>
                        <Container/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3.5}>
                    <Paper>
                        <Statsbar/>
                    </Paper>
                </Grid>
                <Grid xs={12} md={12}>
                    <Paper>
                        <Footer/>
                    </Paper>
                </Grid>
            </Grid>
        </EducatorContext.Provider>            
        </PageContext.Provider>
    </div>
}

export default Layout;