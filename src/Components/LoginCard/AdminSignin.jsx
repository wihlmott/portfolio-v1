import Toolbar from "@mui/material/Toolbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { themeStyles1 } from "../Config";
import { AdminContext, UserContext, VerifiedContext } from "../Context/Context";
import { useContext, useState } from "react";
import { retrieveVerificationCode } from "../../Firebase";

const AdminSignIn = () => {
  const [user] = useContext(UserContext);
  const [admin] = useContext(AdminContext);

  const [verified, setVerified] = useContext(VerifiedContext);
  const [password, setPassword] = useState();
  const passwordHandler = (e) => setPassword(e.target.value);

  // const checkVerification = async () => {
  //   retrieveVerificationCode(user).then((res) => setVerified(res === password));
  // };
  const checkVerification = () => {
    if (password === "3,14159" && user === admin) setVerified(true);
  };

  return (
    <Card
      sx={{
        width: "340px",
        height: "200px",
        margin: "auto",
        mt: 5,
      }}
    >
      <Toolbar
        sx={{
          background: themeStyles1.toolbarColor,
          color: "white",
        }}
      >
        <Typography variant="body2">
          {!verified ? "sign in as admin" : "admin activated"}
        </Typography>
      </Toolbar>
      <Typography variant="body1" sx={{ m: 1 }}>
        User: {user}
      </Typography>

      <TextField
        id="verificationCode"
        variant="outlined"
        label="Verification Code"
        sx={{ ml: 1 }}
        onChange={passwordHandler}
      />
      <Button>
        {!verified && (
          <CheckCircleRoundedIcon
            sx={{ mt: 0.5, fontSize: "2.5rem", color: "#e0e0e0" }}
            onClick={checkVerification}
          />
        )}
        {verified && (
          <VerifiedRoundedIcon sx={{ mt: 0.5, fontSize: "2.5rem" }} />
        )}
      </Button>
    </Card>
  );
};

export default AdminSignIn;
