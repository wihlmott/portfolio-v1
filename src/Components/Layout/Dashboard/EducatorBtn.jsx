import { useContext } from "react";
import { PageContext, EducatorContext } from "../../Context/Context";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";

const EducatorBtn = (props) => {
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const clickHandler = (e) => {
    setEducator(props.educator);
    !e.target.dataset.type
      ? setPage("EDUCATOR_PROFILE_PAGE")
      : setPage(e.target.dataset.type);
  };

  return (
    <Card elevation={2} onClick={clickHandler}>
      <CardHeader
        action={
          <>
            <IconButton>
              <FolderOpenIcon
                data-type={"PLANNING_CHECK_FORM"}
                sx={{
                  m: "-10px",
                  fontSize: "3rem",
                  p: "10px",
                  backgroundColor: "linear-gradient(145deg, #f0f0f0, #cacaca)",
                  boxShadow: "5px 5px 12px #bebebe,-5px -5px 12px #ffffff",
                  borderRadius: 50,
                }}
              />
            </IconButton>
            <IconButton>
              <ContentPasteIcon
                data-type={"ASSESSMENT_CHECK_FORM"}
                sx={{
                  m: "-10px",
                  ml: "5px",
                  fontSize: "3rem",
                  p: "10px",
                  backgroundColor: "linear-gradient(145deg, #f0f0f0, #cacaca)",
                  boxShadow: "5px 5px 12px #bebebe,-5px -5px 12px #ffffff",
                  borderRadius: 50,
                }}
              />
            </IconButton>
          </>
        }
        subheader={props.educator}
      />
    </Card>
  );
};

export default EducatorBtn;
