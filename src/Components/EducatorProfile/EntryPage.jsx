import Typography from "@mui/material/Typography";
import {
  AssessmentCheckFormQuestions,
  PlanningCheckFormQuestions,
} from "../Config";

const EntryPage = ({ entry, educator }) => {
  const displayData = (el, i) => {
    return (
      <div key={el}>
        <Typography sx={{ textDecoration: "underline" }}>{`${
          i + 1
        }. ${el}:`}</Typography>
        <Typography display={"inline"}>
          {el === "General Comments"
            ? ""
            : `${
                entry.entry.details[`${el}-check`] ? `present` : "NOT present"
              }`}
          {/* checkbox tick or blank based on result here */}
        </Typography>
        <Typography>{`${
          entry.entry.details[`${el}-comment`]
            ? `${entry.entry.details[`${el}-comment`]}`
            : `no comment`
        }`}</Typography>
      </div>
    );
  };

  return (
    <>
      <Typography align="center">{entry.type}</Typography>
      <Typography align="center">{entry.entry.id}</Typography>
      <Typography align="center">{educator}</Typography>
      {entry.type === "Assessment File Check" &&
        AssessmentCheckFormQuestions.map(displayData)}
      {entry.type === "Planning File Check" &&
        PlanningCheckFormQuestions.map(displayData)}
    </>
  );
};

export default EntryPage;
