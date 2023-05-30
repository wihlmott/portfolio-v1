import { useContext, useState, useEffect } from "react";
import {
  PageContext,
  EducatorContext,
  UserContext,
} from "../../Context/Context";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { FORMS, PAGES } from "../../Config";
import { retrieveEducatorDetails, retrieveHistory } from "../../../Firebase";
import FormsList from "./FormsList";

const EducatorCard = (props) => {
  const [user, setUser] = useContext(UserContext);
  const [page, setPage] = useContext(PageContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const [educatorDetails, setEducatorDetails] = useState({
    section: "",
    email: "",
    history: [],
    latestPlanningFile: [],
  });
  const [loading, setLoading] = useState(false);
  const [showFormsList, setShowFormsList] = useState(false);

  const clickHandler = (e) => {
    if (e.target.innerHTML.includes("forms")) return;

    setEducator(props.educator);
    // setPage(PAGES.educator_profile_page);
  };

  const showFormsListHandler = () => {
    setShowFormsList(!showFormsList);
  };

  const buttonStyle = {
    m: "-10px",
    fontSize: "3rem",
    p: "10px",
    backgroundColor: "linear-gradient(145deg, #f0f0f0, #cacaca)",
    boxShadow: "1px 1px 10px -2px rgba(0,0,0,0.6) inset",
    borderRadius: 50,
  };

  const styles = {
    textColor: `rgba(128, 128, 128, 0.7)`,
    borderStyle: "1px solid rgba(224,236,222,0.8)",
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const details = await retrieveEducatorDetails(user, props.educator);
        const history = Object.entries(await retrieveHistory(user));
        const historyArr = [];

        history.forEach((el) => {
          if (el[0].includes(props.educator)) historyArr.push(el);
        });
        setEducatorDetails({
          section: details.section,
          email: details.email,
          history: historyArr,
        });
        console.log(historyArr);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

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
        <Typography variant="body2">
          {`${
            educatorDetails?.history[0]
              ? `${educatorDetails.history[0][0]
                  .split("-")[2]
                  .replaceAll("_", " ")
                  .toLowerCase()}`
              : ""
          }`}
        </Typography>
        <Typography variant="body2">
          {`${
            educatorDetails?.history[0]
              ? `${educatorDetails.history[1][0]
                  .split("-")[2]
                  .replaceAll("_", " ")
                  .toLowerCase()}`
              : ""
          }`}
        </Typography>

        <CardActions sx={{ borderTop: styles.borderStyle }}>
          <Button variant="outlined" onClick={showFormsListHandler}>
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

export default EducatorCard;
