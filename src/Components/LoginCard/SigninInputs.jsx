import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const SigninInputs = ({
  setEmailHandler,
  emailIsValid,
  setPasswordHandler,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => setShowPassword(!showPassword);

  return (
    <>
      <TextField
        id="email"
        variant="outlined"
        label="Your Email Address"
        fullWidth
        sx={{ m: 2, mb: 1 }}
        onChange={setEmailHandler}
        error={!emailIsValid}
      />
      <TextField
        id="password"
        variant="outlined"
        label="Password"
        type={`${showPassword ? "input" : "password"}`}
        fullWidth
        sx={{ m: 2, mt: 1 }}
        onChange={setPasswordHandler}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ cursor: "pointer" }}
                onClick={showPasswordHandler}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
