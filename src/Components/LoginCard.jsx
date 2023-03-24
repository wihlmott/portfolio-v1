import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createNewUser, signInUser, signInWithFacebook, signInWithGoogle, signInWithTwitter } from "../Firebase";
import { useState } from "react";

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [passsword, setPassword] = useState('');

    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
    }
    const setEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    const rememberMeHandler = (e) => {
        console.log(`handle remember me ` + e.target.checked);
    }
    const forgotPasswordHandler = () => {
        console.log(`handle forgotten password`);
    }

    const loginWithFacebook = () => {
        console.log(`login with facebook`);
        // signInWithFacebook();
    }
    
    const loginWithGoogle = () => {
        console.log(`login with google`);
        signInWithGoogle();
    }
    
    const loginWithTwitter = () => {
        console.log(`login with twitter`);
        // signInWithTwitter();
    }

    const signUp = () => {
        console.log(`sign up`);
        createNewUser(email, passsword);
    }
    const login = () => {
        console.log(`login with email and password`);
        signInUser(email, passsword);
    }

    return <Grid container>
        <Grid item xs={0.5} md={4}></Grid>
        <Grid item xs={10} md={4}>
        <Card sx={{width:320, mt:2}}>
            <Typography align="center">Sign In</Typography>
            <br/>
            <Grid container columnSpacing={1}>
                <Grid item xs={4} md={4}>
                    <Button variant='outlined' fullWidth sx={{mt:1, mb:2}} onClick={loginWithGoogle}><GoogleIcon/></Button>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Button variant='outlined' fullWidth sx={{mt:1, mb:2}} onClick={loginWithFacebook}><FacebookIcon/></Button>
                </Grid>
                <Grid item xs={4} md={4}>
                    <Button variant='outlined' fullWidth sx={{mt:1, mb:2}} onClick={loginWithTwitter}><TwitterIcon/></Button>
                </Grid>
                <Grid item xs={5.4} md={5.4} borderBottom='1px solid rgba(128, 128, 128, 0.6)' marginBottom={1} marginLeft={1}></Grid>
                <Grid item xs={1} md={1} marginLeft={-1}>
                    <Typography align='center' color='rgba(128, 128, 128)' variant="subtitle">OR</Typography>
                </Grid>
                <Grid item xs={5.4} md={5.4} borderBottom='1px solid rgba(128, 128, 128, 0.6)' marginBottom={1}></Grid>

                <TextField id="email" variant='outlined' label='Email Address' fullWidth sx={{m:2, mb:1}} onChange={setEmailHandler}/>
                <TextField id="password" variant='outlined' label='Password' type='password' fullWidth sx={{m:2, mt:1}} onChange={setPasswordHandler}/>

                <Grid container>
                    <Grid item xs={6} md={6}>
                        <FormControlLabel control={<Checkbox defaultChecked id="remember_me" sx={{ml:2, mr:-1}}/>} label='Remember me' onChange={rememberMeHandler}/>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Button variant="standard" sx={{textTransform:'lowercase', mt:0.4, ml:2.2, color:"primary.main"}} onClick={forgotPasswordHandler}>forgot password?</Button>
                    </Grid>
                </Grid>
            </Grid>
                <Button sx={{mb:1, mt:1}} variant="contained" fullWidth onClick={login}>Login</Button>
                <Button sx={{mb:1, mt:1}} variant="contained" fullWidth onClick={signUp}>Sign Up</Button>
        </Card>
        </Grid>
    </Grid>
}

export default LoginCard;