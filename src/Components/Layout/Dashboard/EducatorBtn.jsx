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
    <div
      style={{
        boxShadow: "0px 0px 10px 2px rgba(63,80,181,0.35)",
        margin: "0 5px",
      }}
    >
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
                    backgroundColor:
                      "linear-gradient(145deg, #f0f0f0, #cacaca)",
                    boxShadow: "1px 1px 10px -2px rgba(0,0,0,0.6) inset",
                    // boxShadow: "5px 5px 12px #bebebe,-5px -5px 12px #ffffff",
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
                    backgroundColor:
                      "linear-gradient(145deg, #f0f0f0, #cacaca)",
                    // boxShadow: "5px 5px 12px #bebebe,-5px -5px 12px #ffffff",
                    boxShadow: "1px 1px 10px -2px rgba(0,0,0,0.6) inset",
                    borderRadius: 50,
                  }}
                />
              </IconButton>
            </>
          }
          subheader={props.educator}
        />
      </Card>
    </div>
  );
};

export default EducatorBtn;
