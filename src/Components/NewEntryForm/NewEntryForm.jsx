import classes from './NewEntryForm.module.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useContext, useReducer } from 'react';
import {PageContext} from '../Context/Context';

const reducer = (state, action) => {
    switch(action.type){
        case 'USER_FIRSTNAME_INPUT':
            return {...state, firstname: action.value, firstnameIsValid: action.value.trim().length > 0}
        case 'USER_LASTNAME_INPUT':        
            return {...state, lastname: action.value, lastnameIsValid: action.value.trim().length > 0}
        case 'USER_EMAIL_INPUT':
            return {...state, email: action.value, emailIsValid: action.value.includes('@')};
        case 'USER_CELL_INPUT':
            return {...state, cell: action.value, cellIsValid: true};
        case 'USER_SECTION_INPUT':
            return {...state, section: action.value, sectionIsValid: action.value.trim().length > 0}
    }
}

const NewEntryForm = () => {
    const [page, setPage] = useContext(PageContext);

    const firstnameChangeHandler = (e) => {
        dispatchReducer({type: 'USER_FIRSTNAME_INPUT', value: e.target.value})
    }
    const lastnameChangeHandler = (e) => {
        dispatchReducer({type: 'USER_LASTNAME_INPUT', value: e.target.value});
    }
    const emailChangeHandler = (e) => {
        dispatchReducer({type: 'USER_EMAIL_INPUT', value: e.target.value});
    }
    const cellChangeHandler = e => {
        dispatchReducer({type: 'USER_CELL_INPUT', value: e.target.value})
    }
    const sectionChangeHandler = (e) => {
        dispatchReducer({type: 'USER_SECTION_INPUT', value: e.target.value});
    }

    const [userState, dispatchReducer] = useReducer(reducer, {
        firstname: '', firstnameIsValid: true,
        lastname: '', lastnameIsValid: true,
        email: '', emailIsValid: true,
        cell: '', cellIsValid: true,
        section: '', sectionIsValid: true, 
    });

    const formSubmit = (e) => {
        e.preventDefault();

        const invalidEntries = [];
        Object.entries(userState).forEach((el)=>{
            if(el[1]===false)return invalidEntries.push(el[0])
        })
        if(invalidEntries.length>0)return alert(`The following fields are invalid: ${invalidEntries}`);

        console.log(userState);
    }
    const closeForm = () => {
        setPage('BANNER_PAGE');
    }

    return(
    <form className={classes.card} onSubmit={formSubmit}>
        <Typography variant='h6' align='center'>New Educator Form</Typography>

        <Grid container>
            <Grid item md={5}>
                <TextField id='firstname' variant='standard' label="First Name *" onChange={firstnameChangeHandler} value={userState.firstname} error={!userState.firstnameIsValid}/>
                <br/>
                <TextField id='email' variant='standard' label="Email *" onChange={emailChangeHandler} error={!userState.emailIsValid}/>
                <br/>
                <TextField id='section' variant='standard' label="Class *" onChange={sectionChangeHandler} error={!userState.sectionIsValid}/>
            </Grid>
            <Grid item md={5}>
                <TextField id='lastname' variant='standard' label="Last Name *" onChange={lastnameChangeHandler} error={!userState.lastnameIsValid}/>
                <br/>
                <TextField id='phoneNumber' variant='standard' label="Phone Number *" onChange={cellChangeHandler} error={!userState.cellIsValid}/>
            </Grid>
        </Grid>
        
        <Button sx={{mt:2}} variant='contained' type='submit'>sumbit</Button>
        <br/>
        <Button sx={{mt:2}} variant='contained' display='flex' justifyContent='flex-end' onClick={closeForm}>close</Button>
    </form>)
}

export default NewEntryForm;