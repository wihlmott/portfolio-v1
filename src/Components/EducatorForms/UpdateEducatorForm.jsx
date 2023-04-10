import classes from "./NewEducatorForm.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import { useContext, useEffect, useState } from "react";
import { EducatorContext, PageContext, UserContext } from "../Context/Context";
import { PAGES, themeStyles1 } from "../Config";
import { deleteEducator, retrieveEducatorDetails } from "../../Firebase";

const UpdateEducatorForm = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const [loading, setLoading] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);

  const [educatorState, setEducatorState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    section: "",
    cell: "",
  });

  useEffect(() => {
    setLoading(true);
    retrieveEducatorDetails(user, educator).then((res) => {
      setEducatorState({
        firstname: res.firstname,
        lastname: res.lastname,
        email: res.email,
        section: res.section,
        cell: res.cell,
      });
      setLoading(false);
    });
  }, [page === PAGES.update_educator_form]);

  const firstnameChangeHandler = (e) =>
    setEducatorState((prev) => {
      return { ...prev, firstname: e.target.value };
    });
  const lastnameChangeHandler = (e) =>
    setEducatorState((prev) => {
      return { ...prev, lastname: e.target.value };
    });
  const emailChangeHandler = (e) =>
    setEducatorState((prev) => {
      return { ...prev, email: e.target.value };
    });
  const sectionChangeHandler = (e) =>
    setEducatorState((prev) => {
      return { ...prev, section: e.target.value };
    });
  const cellChangeHandler = (e) =>
    setEducatorState((prev) => {
      return { ...prev, cell: e.target.value };
    });

  const formSubmit = (e) => {
    e.preventDefault();

    console.log(educator, educatorState);

    // replaceEducatorDetails(user, educator).then((res) => console.log(res));
    // setPage(PAGES.dashboard_page);
  };
  const closeForm = () => {
    setPage(PAGES.dashboard_page);
  };

  const deletePressedHandler = () => setDeletePressed(!deletePressed);
  const deleteUser = () => {
    deleteEducator(user, educator);
    setPage(PAGES.dashboard_page);
  };

  const buttonStyle = { mt: 2, backgroundColor: themeStyles1.buttonColor };

  return (
    <>
      {loading && <LinearProgress />}
      {!loading && (
        <Card
          sx={{
            width: 320,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          elevation={3}
        >
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
                  onChange={firstnameChangeHandler}
                  value={educatorState.firstname}
                  // error={!userState.firstnameIsValid}
                />
                <br />
                <TextField
                  id="lastname"
                  variant="standard"
                  label="Last Name *"
                  value={educatorState.lastname}
                  onChange={lastnameChangeHandler}
                  // error={!userState.lastnameIsValid}
                />
                <br />
                <TextField
                  id="section"
                  variant="standard"
                  label="Class *"
                  value={educatorState.section}
                  onChange={sectionChangeHandler}
                  // error={!userState.sectionIsValid}
                />
              </Grid>
              <Grid item md={5}>
                <TextField
                  id="email"
                  variant="standard"
                  label="Email *"
                  value={educatorState.email}
                  onChange={emailChangeHandler}
                  // error={!userState.emailIsValid}
                />
                <br />
                <TextField
                  id="phoneNumber"
                  variant="standard"
                  label="Phone Number"
                  value={educatorState.cell}
                  onChange={cellChangeHandler}
                  // error={!userState.cellIsValid}
                />
              </Grid>
            </Grid>

            <Button sx={buttonStyle} variant="contained" type="submit">
              update
            </Button>
            <br />
            <Button
              sx={buttonStyle}
              variant="contained"
              display="flex"
              onClick={closeForm}
            >
              close
            </Button>
            <br />
            <br />
            <br />
            {deletePressed && (
              <Alert severity="warning">Are you sure you want to delete</Alert>
            )}
            {!deletePressed && (
              <Button
                sx={buttonStyle}
                variant="contained"
                display="flex"
                onClick={deletePressedHandler}
              >
                delete educator
              </Button>
            )}
            {deletePressed && (
              <Button
                mt="2"
                color="warning"
                variant="contained"
                display="flex"
                onClick={deleteUser}
              >
                confirm delete
              </Button>
            )}
          </form>
        </Card>
      )}
    </>
  );
};

export default UpdateEducatorForm;
