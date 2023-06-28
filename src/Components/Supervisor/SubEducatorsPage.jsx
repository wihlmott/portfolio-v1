import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import EducatorBtn from "../Layout/Dashboard/EducatorBtn";
import { retrieveAllEducators } from "../../Firebase";
import { AdminContext, SupervisorContext } from "../Context/Context";

const SubEducatorsPage = () => {
  const [supervisor] = useContext(SupervisorContext);
  const [admin] = useContext(AdminContext);

  const [namesList, setNamesList] = useState([]);
  const [errorMSG, setErrorMSG] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveAllEducators(admin, supervisor)
      .then((res) => {
        setNamesList(res);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMSG(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <LinearProgress />}
      <Grid container spacing={1} mt={0.1}>
        <Typography pl={1} color="grey" align="center" width="100%">
          {namesList.length === 0 ? "no educators added" : ""}
        </Typography>
        {!loading &&
          namesList.map((el) => {
            return (
              <Grid item xs={12} md={12} key={el}>
                <EducatorBtn educator={el} />
              </Grid>
            );
          })}
      </Grid>
      {errorMSG && <Alert severity="error">{errorMSG}</Alert>}
    </>
  );
};

export default SubEducatorsPage;
