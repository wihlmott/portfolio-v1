import classes from "./NewEducatorForm.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { EducatorContext, PageContext, UserContext } from "../Context/Context";
import { PAGES } from "../Config";
import { retrieveEducatorDetails } from "../../Firebase";

const UpdateEducatorForm = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [cell, setCell] = useState("");
  useEffect(() => {
    retrieveEducatorDetails(user, educator).then((res) => {
      setFirstname(res.firstname);
      setLastname(res.lastname);
      setEmail(res.email);
      setSection(res.section);
      setCell(res.cell);
    });
  }, [page === PAGES.update_educator_form]);

  const formSubmit = (e) => {
    e.preventDefault();

    setPage(PAGES.dashboard_page);
  };
  const closeForm = () => {
    setPage(PAGES.dashboard_page);
  };
  const deleteUser = () => {
    setPage(PAGES.dashboard_page);
  };

  return (
    <form className={classes.card} onSubmit={formSubmit}>
      <Typography variant="h6" align="center">
        Update Educator Form
      </Typography>

      <Grid container>
        <Grid item md={5}>
          <TextField
            id="firstname"
            variant="standard"
            label="First Name *"
            // onChange={firstnameChangeHandler}
            value={firstname}
            // error={!userState.firstnameIsValid}
          />
          <br />
          <TextField
            id="lastname"
            variant="standard"
            label="Last Name *"
            value={lastname}
            // onChange={lastnameChangeHandler}
            // error={!userState.lastnameIsValid}
          />
          <br />
          <TextField
            id="section"
            variant="standard"
            label="Class *"
            value={section}
            // onChange={sectionChangeHandler}
            // error={!userState.sectionIsValid}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            id="email"
            variant="standard"
            label="Email *"
            value={email}
            // onChange={emailChangeHandler}
            // error={!userState.emailIsValid}
          />
          <br />
          <TextField
            id="phoneNumber"
            variant="standard"
            label="Phone Number"
            value={cell}
            // onChange={cellChangeHandler}
            // error={!userState.cellIsValid}
          />
        </Grid>
      </Grid>

      <Button sx={{ mt: 2 }} variant="contained" type="submit">
        update
      </Button>
      <br />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        display="flex"
        justifyContent="flex-end"
        onClick={closeForm}
      >
        close
      </Button>
      <br />
      <br />
      <br />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        display="flex"
        justifyContent="flex-end"
        onClick={deleteUser}
      >
        delete educator
      </Button>
    </form>
  );
};

export default UpdateEducatorForm;
