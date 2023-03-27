import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useContext } from "react";
import { PAGES } from "../Config";
import { EntryContext, PageContext } from "../Context/Context";

const EntriesBtn = (props) => {
  const [page, setPage] = useContext(PageContext);
  const [entry, setEntry] = useContext(EntryContext);

  const displayEntryHandler = (e) => {
    console.log(e.target);

    setEntry({ entry: props.entry, type: props.type });
    setPage(PAGES.entry_page);
  };

  return (
    <>
      <Card
        sx={{
          cursor: `pointer`,
        }}
        onClick={displayEntryHandler}
      >
        <CardHeader subheader={props.entry.id} />
      </Card>
    </>
  );
};

export default EntriesBtn;
