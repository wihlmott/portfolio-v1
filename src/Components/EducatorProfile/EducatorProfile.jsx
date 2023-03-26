import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { retrieveDocs } from "../../Firebase";
import { EducatorContext, UserContext } from "../Context/Context";
import classes from "./EducatorProfile.module.css";
import EntriesBtn from "./EntriesBtn";

const EducatorProfile = () => {
  const [user, setUser] = useContext(UserContext);

  const [educator, setEducator] = useContext(EducatorContext);
  const [loadingLeft, setLoadingLeft] = useState(true);
  const [loadingRight, setLoadingRight] = useState(true);

  //retrieve all entries
  const [AFCentries, setAFCEntries] = useState();
  const [PFCentries, setPFCEntries] = useState();

  useEffect(() => {
    retrieveDocs(user, educator, "Assessment File Check").then((res) => {
      setAFCEntries(res);
      setLoadingLeft(false);
    });
    retrieveDocs(user, educator, "Planning File Check").then((res) => {
      setPFCEntries(res);
      setLoadingRight(false);
    });
  }, []);

  return (
    <div>
      <div className={classes.profileHeader}>{educator}</div>
      <Paper className={classes.leftForms}>
        <Typography variant="h8" borderBottom={"1px solid grey"}>
          Assessment File checks
        </Typography>
        {!loadingLeft &&
          AFCentries.map((el) => {
            return (
              <EntriesBtn
                type={"Assessment File Check"}
                entry={el}
                key={el.id}
              />
            );
          })}
      </Paper>
      <Paper className={classes.rightForms}>
        <Typography variant="h8" borderBottom={"1px solid grey"}>
          Planning File checks
        </Typography>
        {!loadingRight &&
          PFCentries.map((el) => {
            return (
              <EntriesBtn type={"Planning File Check"} entry={el} key={el.id} />
            );
          })}
      </Paper>
    </div>
  );
};

export default EducatorProfile;
