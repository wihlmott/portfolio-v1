import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Container from "./Layout/Container";
import Statsbar from "./Layout/Statsbar/Statsbar";
import Footer from "./Layout/Footer";
import Grid from "@mui/system/Unstable_Grid";
import Paper from "@mui/material/Paper";
import {
  EducatorContext,
  EntryContext,
  PageContext,
  UserContext,
} from "./Context/Context";
import { useEffect, useState } from "react";
import { PAGES } from "./Config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";

const Layout = () => {
  const [page, setPage] = useState(PAGES.login_page);
  const [educator, setEducator] = useState("");
  const [user, setUser] = useState("guest");
  const [entry, setEntry] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.email);
        setPage(PAGES.dashboard_page);
      }
    });
  }, []);

  return (
    <div>
      <UserContext.Provider value={[user, setUser]}>
        <PageContext.Provider value={[page, setPage]}>
          <EducatorContext.Provider value={[educator, setEducator]}>
            <EntryContext.Provider value={[entry, setEntry]}>
              <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item xs={12} md={12}>
                  <Paper>
                    <Header />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Paper>
                    <Sidebar />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6.5}>
                  <Paper>
                    <Container />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3.5}>
                  <Paper>
                    <Statsbar />
                  </Paper>
                </Grid>
                <Grid xs={12} md={12}>
                  <Paper>
                    <Footer />
                  </Paper>
                </Grid>
              </Grid>
            </EntryContext.Provider>
          </EducatorContext.Provider>
        </PageContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default Layout;
