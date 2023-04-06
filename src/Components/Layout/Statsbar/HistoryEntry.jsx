import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FolderIcon from "@mui/icons-material/Folder";
import { useContext } from "react";
import { EntryContext, PageContext } from "../../Context/Context";
import { PAGES } from "../../Config";

const HistoryEntry = ({ entry }) => {
  const [page, setPage] = useContext(PageContext);
  const [_, setEntry] = useContext(EntryContext);

  const displayEntryHandler = (e) => {
    console.log(entry);

    // setEntry({ entry: entry, type: props.type });
    // setPage(PAGES.entry_page);
  };

  return (
    <Card
      sx={{
        height: "3rem",
        borderRadius: "0",
        background:
          "linear-gradient(30deg, rgba(25,118,210,0.15) 0%, rgba(25,118,210,0.45) 100%)",
      }}
      onClick={displayEntryHandler}
    >
      <CardHeader
        sx={{ mt: "-0.5rem" }}
        action={
          <IconButton sx={{ cursor: "default" }}>
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
