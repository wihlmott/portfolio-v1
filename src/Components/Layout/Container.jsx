import classes from './Container.module.css';
import Banner from './Container/Banner';
import Footer from './Container/Footer';
import Projects from './Container/Projects';

const Container = () => {
    return <div className={classes.container}>
        <Banner/>
        <Projects/>
        <Footer/>
    </div>
}

export default Container;