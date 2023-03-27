import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// import FormControlLabel from "@mui/material/FormControlLabel";

const SigninInputs = ({
  setEmailHandler,
  emailIsValid,
  setPasswordHandler,
}) => {
  return (
    <>
      <TextField
        id="email"
        variant="outlined"
        label="Email Address"
        fullWidth
        sx={{ m: 2, mb: 1 }}
        onChange={setEmailHandler}
        error={!emailIsValid}
      />
      <TextField
        id="password"
        variant="outlined"
        label="Password"
        type="password"
        fullWidth
        sx={{ m: 2, mt: 1 }}
        onChange={setPasswordHandler}
      />

      {/* <Grid container>
        <Grid item xs={6} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                id="remember_me"
                sx={{ ml: 2, mr: -1 }}
              />
            }
            label="Remember me"
            onChange={rememberMeHandler}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <Button
            variant="standard"
            sx={{
              textTransform: "lowercase",
              mt: 0.4,
              ml: 2.2,
              color: "primary.main",
            }}
            onClick={forgotPasswordHandler}
          >
            forgot password?
          </Button>
        </Grid>
      </Grid> */}
    </>
  );
};

export default SigninInputs;
