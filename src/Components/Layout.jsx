import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar/Sidebar';
import Container from './Layout/Container';
import Statsbar from './Layout/Statsbar/Statsbar';
import Footer from './Layout/Footer'
import PageContext from './Context/Context'
import { useState } from 'react';

const Layout = () => {
    const [page, setPage] = useState('BANNER_PAGE');

    return <div>
        <PageContext.Provider value={[page, setPage]}>
            <Header/>
            <Sidebar/>
            <Container/>
            <Statsbar/>
            <Footer/>
        </PageContext.Provider>
    </div>
}

export default Layout;