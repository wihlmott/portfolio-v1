import classes from "./NewEducatorForm.module.css";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext, useReducer, useState } from "react";
import { AdminContext, PageContext, UserContext } from "../Context/Context";
import { PAGES, themeStyles1 } from "../Config";

//
import { createNewEducator, retrieveAllEducators } from "../../Firebase";
//
const reducer = (state, action) => {
  switch (action.type) {
    case "USER_FIRSTNAME_INPUT":
      return {
        ...state,
        firstname: action.value,
        firstnameIsValid: action.value.trim().length > 0,
      };
    case "USER_LASTNAME_INPUT":
      return {
        ...state,
        lastname: action.value,
        lastnameIsValid: action.value.trim().length > 0,
      };
    case "USER_EMAIL_INPUT":
      return {
        ...state,
        email: action.value,
        emailIsValid: action.value.includes("@"),
      };
    case "USER_CELL_INPUT":
      return { ...state, cell: action.value, cellIsValid: true };
    case "USER_SECTION_INPUT":
      return {
        ...state,
        section: action.value,
        sectionIsValid: action.value.trim().length > 0,
      };

    case "FIRSTNAME_INVALID":
      return { ...state, firstname: "", firstnameIsValid: false };
    case "LASTNAME_INVALID":
      return { ...state, lastname: "", lastnameIsValid: false };
    case "EMAIL_INVALID":
      return { ...state, email: "", emailIsValid: false };
    case "SECTION_INVALID":
      return { ...state, section: "", sectionIsValid: false };
  }
};

const NewEntryForm = () => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [admin, setAdmin] = useContext(AdminContext);

  const [message, setMessage] = useState();

  const firstnameChangeHandler = (e) =>
    dispatchReducer({ type: "USER_FIRSTNAME_INPUT", value: e.target.value });
  const lastnameChangeHandler = (e) =>
    dispatchReducer({ type: "USER_LASTNAME_INPUT", value: e.target.value });
  const emailChangeHandler = (e) =>
    dispatchReducer({ type: "USER_EMAIL_INPUT", value: e.target.value });
  const cellChangeHandler = (e) =>
    dispatchReducer({ type: "USER_CELL_INPUT", value: e.target.value });
  const sectionChangeHandler = (e) =>
    dispatchReducer({ type: "USER_SECTION_INPUT", value: e.target.value });

  const [userState, dispatchReducer] = useReducer(reducer, {
    firstname: "",
    firstnameIsValid: true,
    lastname: "",
    lastnameIsValid: true,
    email: "",
    emailIsValid: true,
    cell: "",
    cellIsValid: true,
    section: "",
    sectionIsValid: true,
  });

  const formSubmit = async (e) => {
    e.preventDefault();
    if (userState.firstname.trim().length < 1) {
      dispatchReducer({ type: "FIRSTNAME_INVALID", value: "" });
      return;
    }
    if (userState.lastname.trim().length < 1) {
      dispatchReducer({ type: "LASTNAME_INVALID", value: "" });
      return;
    }
    if (userState.section.trim().length < 1) {
      dispatchReducer({ type: "SECTION_INVALID", value: "" });
      return;
    }
    if (userState.email.trim().length < 1) {
      dispatchReducer({ type: "EMAIL_INVALID", value: "" });
      return;
    }

    // const invalidEntries = [];
    // Object.entries(userState).forEach((el) => {
    //   if (el[1] === false) return invalidEntries.push(el[0]);
    // });
    // if (invalidEntries.length > 0)
    //   return alert(`The following fields are invalid: ${invalidEntries}`);

    try {
      const allEducators = await retrieveAllEducators(admin, user);
      const number =
        Math.max(
          ...allEducators.map((el) => el !== "history" && el.split("-")[0]),
          99
        ) + 1;

      await createNewEducator(admin, user, userState, number);
      setMessage({ severity: "success", message: `successfully added` });
      setTimeout(() => setPage(PAGES.dashboard_page), 2000);
    } catch (err) {
      setMessage({ severity: "error", message: err.message });
    }
  };
  const closeForm = () => {
    setPage(PAGES.dashboard_page);
  };

  const buttonStyle = { mt: 2, backgroundColor: themeStyles1.buttonColor };

  return (
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
          New Educator Form
        </Typography>

        <Grid container>
          <Grid item md={5}>
            <TextField
              id="firstname"
              variant="standard"
              label="First Name *"
              onChange={firstnameChangeHandler}
              value={userState.firstname}
              error={!userState.firstnameIsValid}
            />
            <br />
            <TextField
              id="lastname"
              variant="standard"
              label="Last Name *"
              onChange={lastnameChangeHandler}
              error={!userState.lastnameIsValid}
            />
            <br />
            <TextField
              id="section"
              variant="standard"
              label="Class *"
              onChange={sectionChangeHandler}
              error={!userState.sectionIsValid}
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              id="email"
              variant="standard"
              label="Email *"
              onChange={emailChangeHandler}
              error={!userState.emailIsValid}
            />
            <br />
            <TextField
              id="phoneNumber"
              variant="standard"
              label="Phone Number"
              onChange={cellChangeHandler}
              // error={!userState.cellIsValid}
            />
          </Grid>
        </Grid>
        {message && (
          <Alert
            severity={message.severity}
            sx={{ mt: 2 }}
            action={
              message.severity === "success" && (
                <ThumbUpIcon className={classes.shakeIcon} />
              )
            }
          >
            {message.message}
          </Alert>
        )}
        {message?.severity !== "success" && (
          <Button sx={buttonStyle} variant="contained" type="submit">
            sumbit
          </Button>
        )}
        <br />
        <Button
          sx={buttonStyle}
          variant="contained"
          display="flex"
          onClick={closeForm}
        >
          close
        </Button>
      </form>
    </Card>
  );
};

export default NewEntryForm;
