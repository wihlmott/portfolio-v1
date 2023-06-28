import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";

const Role = ({
  setAdminEmailHandler,
  adminEmailIsValid,
  roleHandler,
  role,
}) => {
  return (
    <>
      <FormControl sx={{ ml: 2 }} onChange={roleHandler}>
        <FormLabel>Role:</FormLabel>
        <RadioGroup defaultValue={"Supervisor"} row>
          <FormControlLabel
            value="Supervisor"
            control={<Radio />}
            label="Supervisor"
          />
          <FormControlLabel
            value="Administrator"
            control={<Radio />}
            label="Administrator"
          />
        </RadioGroup>
      </FormControl>

      {role === "Supervisor" && (
        <TextField
          id="adminEmail"
          variant="outlined"
          label="Administrator's Email Address"
          fullWidth
          sx={{ m: 2, mb: 1 }}
          onChange={setAdminEmailHandler}
          error={!adminEmailIsValid}
        />
      )}
    </>
  );
};

export default Role;
