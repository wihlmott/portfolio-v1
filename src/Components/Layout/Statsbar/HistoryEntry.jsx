import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
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
      sx={{ height: "3rem", borderRadius: "0" }}
      onClick={displayEntryHandler}
    >
      <CardHeader
        sx={{ mt: "-0.5rem" }}
        action={
          <IconButton sx={{ cursor: "default" }}>
            {entry[0].includes("Planning") ? <FolderOpenIcon /> : ""}
            {entry[0].includes("Assessment") ? <ContentPasteIcon /> : ""}
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
