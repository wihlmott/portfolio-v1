import Card from "@mui/material/Card";
import SettingsIcon from "@mui/icons-material/Settings";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext, useEffect, useState } from "react";
import { retrieveDocs } from "../../Firebase";
import {
  AdminContext,
  VerifiedContext,
  SupervisorContext,
  EducatorContext,
  PageContext,
  UserContext,
} from "../Context/Context";
import EntriesBtn from "./EntriesBtn";
import { FORMS, PAGES, themeStyles1 } from "../Config";

const EducatorProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const [admin, setAdmin] = useContext(AdminContext);
  const [verified] = useContext(VerifiedContext);
  const [supervisor] = useContext(SupervisorContext);

  const [educator, setEducator] = useContext(EducatorContext);
  const [page, setPage] = useContext(PageContext);
  const [loading, setLoading] = useState(true);

  const allForms = [];
  Object.values(FORMS).map((form) => {
    allForms.push(form[0]);
  });
  const entries = {};
  const [allEntries, setAllEntries] = useState({});
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    verified &&
      allForms.map(async (el) => {
        try {
          await retrieveDocs(admin, supervisor, educator, el).then((res) => {
            entries[el] = res;
            setAllEntries(() => entries);
          });
          setLoading(false);
        } catch (err) {
          console.log(`could not load docs - ${err}`);
        }
      });

    !verified &&
      allForms.map(async (el) => {
        try {
          await retrieveDocs(admin, user, educator, el).then((res) => {
            entries[el] = res;
            setAllEntries(() => entries);
          });
          setLoading(false);
        } catch (err) {
          console.log(`could not load docs - ${err}`);
        }
      });
  }, []);

  const [selectedForm, setSelectedForm] = useState(allForms[0]);
  const changeFormScroll = () => {
    let i = allForms.indexOf(selectedForm);
    i === allForms.length - 1 ? (i = 0) : i++;
    setSelectedForm(allForms[i]);
  };
  const changeFormList = (e) => {
    setSelectedForm(e.target.innerHTML.split("<")[0].replaceAll(" ", "_"));
    setOpenList(false);
  };

  const openListHandler = () => setOpenList(!openList);

  const updateProfilePage = () => setPage(PAGES.update_educator_form);

  return (
    <>
      <Toolbar
        sx={{
          background: themeStyles1.toolbarColor,
          color: "white",
        }}
      >
        <Typography>{educator}</Typography>
        <SettingsIcon
          onClick={updateProfilePage}
          data-type={"UPDATE_EDUCATOR_FORM"}
          sx={{
            m: "-10px",
            ml: "auto",
            fontSize: "3rem",
            p: "10px",
            cursor: "pointer",
          }}
        />
      </Toolbar>
      {loading && <LinearProgress />}
      <Grid container>
        <Grid item xs={10} md={11}>
          <Card sx={{ width: "120%" }}>
            <div style={{ marginLeft: "10px" }}>
              {!openList && (
                <Button
                  sx={{
                    mt: 1,
                    mb: 1,
                    mr: -2,
                    display: "block",
                    backgroundColor: "#e0e0e0",
                  }}
                  variant="outlined"
                  onClick={changeFormScroll}
                >
                  {selectedForm.replaceAll("_", " ")}
                </Button>
              )}
              {openList &&
                allForms.map((el) => {
                  return (
                    <Button
                      sx={{
                        mt: 1,
                        mb: 1,
                        mr: -2,
                        display: "block",
                        backgroundColor: selectedForm === el ? "#e0e0e0" : "",
                      }}
                      variant="outlined"
                      onClick={changeFormList}
                      key={el}
                    >
                      {el.replaceAll("_", " ")}
                    </Button>
                  );
                })}
            </div>
            {allEntries[selectedForm] &&
              allEntries[selectedForm].map((entry) => {
                return <EntriesBtn type={selectedForm} entry={entry} />;
              })}
          </Card>
        </Grid>
        <Grid item xs={2} md={1}>
          <Button
            sx={{
              rotate: openList ? "180deg" : "",
            }}
          >
            <KeyboardArrowDownIcon onClick={openListHandler} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EducatorProfile;
