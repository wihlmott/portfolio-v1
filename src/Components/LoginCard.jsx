import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const LoginCard = () => {
    const checkedHandler = (e) => {
        console.log(e.target.value);
    }
    return <Paper sx={{width:320, transform:'translateX(50%)', mt:2}}>
        <Typography align="center">Sign In</Typography>
        <br/>
        <Grid container columnSpacing={1}>
            <Grid item md={4}>
                <Button variant='outlined' fullWidth sx={{mt:1, mb:2}}>G</Button>
            </Grid>
            <Grid item md={4}>
                <Button variant='outlined' fullWidth sx={{mt:1, mb:2}}>f</Button>
            </Grid>
            <Grid item md={4}>
                <Button variant='outlined' fullWidth sx={{mt:1, mb:2}}>t</Button>
            </Grid>
            <Grid item md={5.4} borderBottom='1px solid rgba(128, 128, 128, 0.6)' marginBottom={1} marginLeft={1}></Grid>
            <Grid item md={1} marginLeft={-1}>
                <Typography align='center' color='rgba(128, 128, 128)' variant="subtitle">OR</Typography>
            </Grid>
            <Grid item md={5.4} borderBottom='1px solid rgba(128, 128, 128, 0.6)' marginBottom={1}></Grid>

            <TextField id="email" variant='outlined' label='Email Address' fullWidth sx={{m:2, mb:1}}/>
            <TextField id="password" variant='outlined' label='Password' type='password' fullWidth sx={{m:2, mt:1}}/>

            <FormControlLabel control={<Checkbox id="remember_me" sx={{ml:2, mr:-1}}/>} label='Remember me' onChange={checkedHandler}/>
        </Grid>
            <Button sx={{mb:1, mt:1}} variant="contained" fullWidth>Login</Button>
    </Paper>
}

export default LoginCard;