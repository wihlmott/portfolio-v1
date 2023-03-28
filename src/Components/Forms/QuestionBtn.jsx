import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import classes from "./QuestionBtn.module.css";
import { useState } from "react";
import { TextField } from "@mui/material";

const QuestionBtn = ({ question, sendComment, sendCheck }) => {
  const [commentBox, setCommentBox] = useState(false);
  let comment = false;

  const openCommentbox = () => {
    if (comment) return;
    setCommentBox(!commentBox);
  };
  const setCommentHandler = (e) => {
    if (e.target.value.trim().length !== 0) {
      sendComment({ question: question, comment: e.target.value });
      return (comment = true);
    }
    if (e.target.value.trim().length === 0) return (comment = false);
  };
  const setCheckHandler = (e) => {
    sendCheck({ question: question, checked: e.target.checked });
  };

  if (question === "General Comments")
    return (
      <Paper className={classes.card}>
        <Typography variant="h7">{question}</Typography>
        {commentBox && (
          <TextField
            id="comment"
            variant="standard"
            label="Comment"
            fullWidth
            onChange={setCommentHandler}
            className={classes.fadeInBox}
          />
        )}
      </Paper>
    );

  return (
    <Paper className={classes.card}>
      <Typography variant="h7">{question}</Typography>
      <span
        className={
          !commentBox
            ? `${classes.downArrow}`
            : `${classes.downArrow} ${classes.flipArrow}`
        }
      >
        <KeyboardDoubleArrowDownIcon onClick={openCommentbox} />
      </span>
      <span className={classes.checkbox}>
        <Checkbox onChange={setCheckHandler} />
      </span>
      {commentBox && (
        <TextField
          id="comment"
          variant="standard"
          label="Comment"
          fullWidth
          onChange={setCommentHandler}
          className={classes.fadeInBox}
        />
      )}
    </Paper>
  );
};

export default QuestionBtn;
