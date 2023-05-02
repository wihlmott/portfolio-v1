import { useContext } from "react";
import { PageContext, EducatorContext } from "../../Context/Context";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { PAGES } from "../../Config";
import ReactCurvedText from "react-curved-text";

const EducatorBtn = (props) => {
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  let formClicked = false;

  const clickHandler = (e) => {
    if (formClicked) return;

    setEducator(props.educator);
    setPage(PAGES.educator_profile_page);
  };

  const openPlanningCheck = () => {
    formClicked = true;

    setEducator(props.educator);
    setPage("PLANNING_CHECK_FORM");
  };
  const openAssessmentCheck = () => {
    formClicked = true;

    setEducator(props.educator);
    setPage("ASSESSMENT_CHECK_FORM");
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
          <Grid container sx={{ mt: -6, mb: -7.5 }}>
            <Grid item xs={8} md={10}></Grid>
            <Grid item xs={2} md={1}>
              <IconButton sx={{ mr: 2 }}>
                <FolderOpenIcon onClick={openPlanningCheck} sx={buttonStyle} />
              </IconButton>
              <ReactCurvedText
                width={100}
                height={75}
                cx={26}
                cy={-40}
                rx={45}
                ry={50}
                startOffset={52}
                textProps={{ style: { fontSize: 12 } }}
                textPathProps={{ fill: "#808080" }}
                text={"planning"}
              />
            </Grid>
            <Grid item xs={2} md={1}>
              <IconButton>
                <ContentPasteIcon
                  onClick={openAssessmentCheck}
                  sx={buttonStyle}
                />
              </IconButton>
              <ReactCurvedText
                width={110}
                height={75}
                cx={25}
                cy={-39}
                rx={47}
                ry={50}
                startOffset={50}
                textProps={{ style: { fontSize: 12 } }}
                textPathProps={{ fill: "#808080" }}
                text={" assessment "}
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default EducatorBtn;
