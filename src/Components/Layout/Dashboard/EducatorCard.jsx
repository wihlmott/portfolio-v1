import { useContext, useState, useEffect } from "react";
import {
  PageContext,
  EducatorContext,
  UserContext,
} from "../../Context/Context";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { FORMS, PAGES } from "../../Config";
import { retrieveDocs, retrieveEducatorDetails } from "../../../Firebase";

const EducatorCard = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const [educatorDetails, setEducatorDetails] = useState({
    section: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

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
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const details = await retrieveEducatorDetails(user, props.educator);
        setEducatorDetails({
          section: details.section,
          email: details.email,
        });
        const latestPlanningFile = await retrieveDocs(
          user,
          props.educator,
          "Planning File Check"
        );
        console.log(latestPlanningFile);
        const latestAssessmentFile = await retrieveDocs(
          user,
          props.educator,
          "Assessment File Check"
        );
        console.log(latestAssessmentFile);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  const styles = {
    textColor: `rgba(128, 128, 128, 0.7)`,
    borderStyle: "1px solid rgba(224,236,222,0.8)",
  };

  return (
    <div
      style={{
        boxShadow: "0px 0px 10px 2px rgba(63,80,181,0.35)",
        margin: "0 2px",
      }}
    >
      <Card elevation={2} onClick={clickHandler} sx={{ cursor: "pointer" }}>
        <CardHeader
          subheader={props.educator.split("-")[1].trim()}
          sx={{
            borderBottom: styles.borderStyle,
          }}
        />
        {loading && <LinearProgress />}
        <Typography mt={1} variant="body2" color={styles.textColor}>
          {`Class: ${educatorDetails.section}`}
        </Typography>
        <Typography variant="body2" noWrap color={styles.textColor}>
          {`Email: ${educatorDetails.email}`}
        </Typography>

        <Typography
          sx={{
            mt: 4,
            borderTop: styles.borderStyle,
            color: styles.textColor,
          }}
        >
          last submissions:
        </Typography>
        <Typography></Typography>

        <CardActions sx={{ borderTop: styles.borderStyle }}>
          <IconButton>
            <FolderOpenIcon onClick={openPlanningCheck} sx={buttonStyle} />
          </IconButton>
          <IconButton>
            <ContentPasteIcon onClick={openAssessmentCheck} sx={buttonStyle} />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default EducatorCard;