import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Container from "./Layout/Container/Container";
import Statsbar from "./Layout/Statsbar/Statsbar";
import Footer from "./Layout/Footer";
import Grid from "@mui/system/Unstable_Grid";
import Paper from "@mui/material/Paper";
import {
  EducatorContext,
  EntryContext,
  PageContext,
  SupervisorContext,
  UserContext,
  VerifiedContext,
} from "./Context/Context";
import { useEffect, useState } from "react";
import { PAGES } from "./Config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import background from "../images/pencilsOpac.jpg";

const Layout = () => {
  const [page, setPage] = useState(PAGES.login_page);
  const [educator, setEducator] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [user, setUser] = useState("guest");
  const [entry, setEntry] = useState();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.email);
        setPage(PAGES.dashboard_page);
      }
    });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <UserContext.Provider value={[user, setUser]}>
        <VerifiedContext.Provider value={[verified, setVerified]}>
          <PageContext.Provider value={[page, setPage]}>
            <SupervisorContext.Provider value={[supervisor, setSupervisor]}>
              <EducatorContext.Provider value={[educator, setEducator]}>
                <EntryContext.Provider value={[entry, setEntry]}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={12}>
                      <Header />
                      <br />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Paper>
                        <Sidebar />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6.5}>
                      <Paper sx={{ backgroundColor: "transparent" }}>
                        <Container />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                      <Paper>
                        <Statsbar />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Paper>
                        <Footer />
                      </Paper>
                    </Grid>
                  </Grid>
                </EntryContext.Provider>
              </EducatorContext.Provider>
            </SupervisorContext.Provider>
          </PageContext.Provider>
        </VerifiedContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default Layout;
