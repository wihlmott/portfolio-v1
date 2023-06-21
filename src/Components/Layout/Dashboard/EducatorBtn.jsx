import { useContext } from "react";
import { PageContext, EducatorContext } from "../../Context/Context";
// import ContentPasteIcon from "@mui/icons-material/ContentPaste";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { FORMS, PAGES } from "../../Config";
import { useState } from "react";
import FormsList from "./FormsList";
// import ReactCurvedText from "react-curved-text"; remove from dependencies

const EducatorBtn = (props) => {
  const [showFormsList, setShowFormsList] = useState(false);

  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const clickHandler = (e) => {
    if (e.target.innerHTML.includes("forms")) return;
    setEducator(props.educator);

    let formOpen = false;
    Object.values(FORMS).forEach((form) => {
      e.target.innerHTML.includes(form[0].replaceAll("_", " "))
        ? (formOpen = true)
        : "";
    });
    !formOpen && setPage(PAGES.educator_profile_page);
  };

  const handleShowFormsList = () => {
    setShowFormsList(!showFormsList);
  };

  const buttonStyle = {
    m: "-10px",
    fontSize: "3rem",
    p: "10px",
    backgroundColor: "linear-gradient(145deg, #f0f0f0, #cacaca)",
    boxShadow: "1px 1px 10px -2px rgba(0,0,0,0.6) inset",
    borderRadius: 50,
    zIndex: 5,
  };

  return (
    <div
      style={{
        boxShadow: "0px 0px 10px 2px rgba(63,80,181,0.35)",
        margin: "0 5px",
      }}
    >
      <Card elevation={2} onClick={clickHandler} sx={{ cursor: "pointer" }}>
        <CardHeader subheader={props.educator} />
        <CardActions>
          <Button
            variant="outlined"
            sx={{
              ml: "230px",
              mt: "-70px",
              position: "absolute",
              backgroundColor: `${showFormsList ? "#e0e0e0" : ""}`,
            }}
            onClick={handleShowFormsList}
          >
            forms
          </Button>
        </CardActions>
        {showFormsList &&
          Object.values(FORMS).map((title) => (
            <FormsList formTitle={title[0]} key={title[0]} />
          ))}
      </Card>
    </div>
  );
};

export default EducatorBtn;
