import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { UserContext } from "../../Context/Context";
import classes from "./Banner.module.css";

const Banner = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <div className={classes.banner}>
      <Typography>You are signed in as - {user}</Typography>
    </div>
  );
};

export default Banner;
