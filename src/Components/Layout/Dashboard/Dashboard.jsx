import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import { retrieveAllEducators } from "../../../Firebase";
import { UserContext } from "../../Context/Context";
import EducatorBtn from "./EducatorBtn";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [namesList, setNamesList] = useState();

  useEffect(() => {
    retrieveAllEducators(user).then((res) => {
      setNamesList(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading && <LinearProgress />}
      <Grid container spacing={1} mt={0.1}>
        {!loading &&
          namesList.map((el) => {
            if (el === "history") return;
            if (el === "details") return;
            return (
              <Grid item xs={12} md={12} key={el}>
                <EducatorBtn educator={el} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Dashboard;
