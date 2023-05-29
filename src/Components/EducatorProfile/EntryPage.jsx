import Typography from "@mui/material/Typography";
import { FORMS } from "../Config";

const EntryPage = ({ entry, educator }) => {
  console.log(entry.entry);

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
      <Typography align="center">{entry.type.replaceAll("_", " ")}</Typography>
      <Typography align="center">{entry.entry.id}</Typography>
      <Typography align="center">{educator}</Typography>
      {Object.values(FORMS).map((el) => {
        if (entry.type === el[0]) return el[1].map(displayData);
      })}
    </>
  );
};

export default EntryPage;
