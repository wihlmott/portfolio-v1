import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useContext } from "react";
import { PageContext } from "../../Context/Context";

const FormsList = ({ formTitle }) => {
  const [page, setPage] = useContext(PageContext);
  const openFormHandler = () => {
    setPage(formTitle);
  };
  return (
    <Card
      key={formTitle}
      sx={{
        width: "auto",
        padding: "10px",
        m: 1,
        mt: -0.35,
        borderRadius: "20px",
        boxShadow: "1px 1px 10px -2px rgba(0,0,0,0.6) inset",
        cursor: "pointer",
      }}
      onClick={openFormHandler}
    >
      <Typography variant="caption">
        {formTitle.replaceAll("_", " ")}
      </Typography>
    </Card>
  );
};

export default FormsList;
