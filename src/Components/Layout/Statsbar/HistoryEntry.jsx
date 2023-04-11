import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import { useContext } from "react";
import {
  EducatorContext,
  EntryContext,
  PageContext,
  UserContext,
} from "../../Context/Context";
import { PAGES } from "../../Config";
import { retrieveEntry } from "../../../Firebase";

const HistoryEntry = ({ entry }) => {
  const [page, setPage] = useContext(PageContext);
  const [_, setEntry] = useContext(EntryContext);
  const [educator, setEducator] = useContext(EducatorContext);
  const [user, setUser] = useContext(UserContext);

  const displayEntryHandler = async (e) => {
    const entryArr = entry[0].split("-");
    setEducator(`${entryArr[0].trim()} - ${entryArr[1].trim()}`);

    console.log(user, educator, entryArr[2].trim(), entry[1]);
    try {
      const entryObj = await retrieveEntry(
        user,
        educator,
        entryArr[2].trim(),
        entry[1]
      );
      setEntry({
        entry: { details: entryObj, id: entry[1] },
        type: entryArr[2].trim(),
      });
    } catch (err) {
      throw err;
    }
    setPage(PAGES.entry_page);
  };

  return (
    <Card
      sx={{
        m: 0.5,
        height: "3rem",
        background:
          "linear-gradient(90deg, rgba(224,236,222,0.8), rgba(224,236,222,0.1))",
        boxShadow:
          "inset 20px 20px 60px #bebebe,inset -20px -20px 60px #ffffff",
      }}
      onClick={displayEntryHandler}
    >
      <CardHeader
        sx={{ mt: "-0.5rem" }}
        action={
          <IconButton
            sx={{
              cursor: "default",
              backgroundColor: "linear-gradient(145deg, #f0f0f0, #cacaca)",
              boxShadow: "20px 20px 60px #606060,-20px -20px 60px #ffffff",
            }}
          >
            {entry[0].includes("Planning") ? (
              <FolderIcon color="warning" />
            ) : (
              ""
            )}
            {entry[0].includes("Assessment") ? (
              <AssignmentIcon color="warning" />
            ) : (
              ""
            )}
          </IconButton>
        }
        subheader={
          <>
            <Typography variant="subtitle">{`${
              entry[0].split("-")[1]
            }`}</Typography>
            <Typography variant="subtitle" color={"grey"}>
              {` - ${entry[1]}`}
            </Typography>
          </>
        }
      />
    </Card>
  );
};

export default HistoryEntry;
