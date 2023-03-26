import Typography from "@mui/material/Typography";
import { AssessmentCheckFormQuestions } from "../Config";

const EntryPage = ({ entry, educator }) => {
  return (
    <>
      <Typography align="center">{entry.type}</Typography>
      <Typography align="center">{entry.entry.id}</Typography>
      <Typography align="center">{educator}</Typography>
      {entry.type === "Assessment File Check" &&
        AssessmentCheckFormQuestions.map((el, i) => {
          return (
            <>
              <Typography sx={{ textDecoration: "underline" }}>{`${
                i + 1
              }. ${el}:`}</Typography>
              <Typography display={"inline"}>
                {`${entry.entry.details[`${el}-check`] ? `passed` : `*failed`}`}
              </Typography>
              <Typography>{`${
                entry.entry.details[`${el}-comment`]
                  ? `${entry.entry.details[`${el}-comment`]}`
                  : `no comment`
              }`}</Typography>
            </>
          );
        })}
    </>
  );
};

export default EntryPage;
