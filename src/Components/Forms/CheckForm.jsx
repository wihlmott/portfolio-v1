import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext, useReducer } from "react";
import { EducatorContext, PageContext, UserContext } from "../Context/Context";
import QuestionBtn from "./QuestionBtn";
import { addNewCheckForm, addToHistory } from "../../Firebase";
import { PAGES, themeStyles1 } from "../Config";
import sendEmail from "../../Email";

const reducer = (state, action) => {
  if (action.type === "COMMENT")
    return { ...state, [`${action.question}-comment`]: action.comment };
  if (action.type === "CHECKED")
    return { ...state, [`${action.question}-check`]: action.checked };
};

const CheckForm = ({ formType, formQuestions }) => {
  const [user, setUser] = useContext(UserContext);

  const [educator, setEducator] = useContext(EducatorContext);
  const [page, setPage] = useContext(PageContext);

  const [formState, dispatchReducer] = useReducer(reducer, {});

  const formSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const dateEntry = date
      .toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replaceAll(" ", "");
    addNewCheckForm(user, educator, formType, dateEntry, formState);
    addToHistory(user, educator, formType, date);

    sendEmail(user, educator, {
      title: formType,
      date: dateEntry,
      details: formState,
    });

    setPage(PAGES.dashboard_page);
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
          <div key={el}>
            <QuestionBtn
              question={el}
              sendCheck={sendCheck}
              sendComment={sendComment}
            />
            <br />
          </div>
        );
      })}
      <Button variant="contained" type="submit" sx={buttonStyle}>
        submit
      </Button>
    </form>
  );
};

export default CheckForm;
