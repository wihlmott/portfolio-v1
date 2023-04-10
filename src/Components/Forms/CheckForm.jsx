import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useContext, useReducer, useState } from "react";
import { EducatorContext, PageContext, UserContext } from "../Context/Context";
import QuestionBtn from "./QuestionBtn";
import { addNewCheckForm, addToHistory } from "../../Firebase";
import { PAGES, themeStyles1 } from "../Config";
import sendEmail from "../../Email";

import classes from "./Checkform.module.css";

const reducer = (state, action) => {
  if (action.type === "COMMENT")
    return { ...state, [`${action.question}-comment`]: action.comment };
  if (action.type === "CHECKED")
    return { ...state, [`${action.question}-check`]: action.checked };
};

const CheckForm = ({ formType, formQuestions }) => {
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState();

  const [educator, setEducator] = useContext(EducatorContext);
  const [page, setPage] = useContext(PageContext);

  const [formState, dispatchReducer] = useReducer(reducer, {});

  const formSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    const dateEntry = date
      .toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replaceAll(" ", "");

    try {
      addNewCheckForm(user, educator, formType, dateEntry, formState);
    } catch (err) {
      setMessage({ severity: "error", message: err.message });
    }
    try {
      addToHistory(user, educator, formType, date);
    } catch (err) {
      setMessage({ severity: "error", message: err.message });
    }

    try {
      await sendEmail(user, educator, {
        title: formType,
        date: dateEntry,
        details: formState,
      });
      setMessage({ severity: "success", message: "email sent" });
      setTimeout(() => setPage(PAGES.dashboard_page), 2000);
    } catch (err) {
      setMessage({ severity: "error", message: err.message });
    }
  };

  const sendCheck = (e) => {
    dispatchReducer({
      type: "CHECKED",
      question: e.question,
      checked: e.checked,
    });
  };
  const sendComment = (e) => {
    dispatchReducer({
      type: "COMMENT",
      question: e.question,
      comment: e.comment,
    });
  };

  const buttonStyle = { ml: 1, backgroundColor: themeStyles1.buttonColor };

  return (
    <form onSubmit={formSubmit}>
      <Typography
        variant="h6"
        align="center"
      >{`${formType} Form -- for ${educator}`}</Typography>
      {formQuestions.map((el) => {
        return (
          <div key={el} style={{ paddingBottom: "7px" }}>
            <QuestionBtn
              question={el}
              sendCheck={sendCheck}
              sendComment={sendComment}
            />
          </div>
        );
      })}
      {message && (
        <Alert
          severity={message.severity}
          action={
            message.severity === "success" && (
              <ThumbUpIcon className={classes.shakeIcon} />
            )
          }
        >{`${message.message}`}</Alert>
      )}

      {message?.severity !== "success" && (
        <Button variant="contained" type="submit" sx={buttonStyle}>
          submit
        </Button>
      )}
    </form>
  );
};

export default CheckForm;
