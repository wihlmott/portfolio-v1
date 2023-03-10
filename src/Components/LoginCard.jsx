import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Checkbox } from "@mui/material";

const LoginCard = () => {
    return <Paper sx={{width:320}}>
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
            <Grid item md={5.4} borderBottom='1px solid rgba(128, 128, 128, 0.6)' marginBottom={1}></Grid>
            <Grid item md={1.2}>
                <Typography align='center' color='rgba(128, 128, 128)' variant="subtitle">OR</Typography>
            </Grid>
            <Grid item md={5.4} borderBottom='1px solid rgba(128, 128, 128, 0.6)' marginBottom={1}></Grid>

            <TextField id="email" variant='outlined' label='Email Address' fullWidth sx={{m:2, mb:1}}/>
            <TextField id="password" variant='outlined' label='Password' type='password' fullWidth sx={{m:2, mt:1}}/>

            <Checkbox id="remember_me" sx={{mt:-1, ml:1, mr:-1}}/>
            <Typography>Remember me</Typography>
            
        </Grid>
    </Paper>
}

export default LoginCard;