import { useContext, useState, useEffect } from "react";
import {
  EducatorContext,
  EntryContext,
  PageContext,
} from "../../Context/Context";
import { FORMS, PAGES } from "../../Config";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../../Profile/Profile";
import NewEducatorForm from "../../EducatorForms/NewEducatorForm";
import classes from "./Container.module.css";
import Banner from "../Container/Banner";
import CheckForm from "../../Forms/CheckForm";
import EducatorProfile from "../../EducatorProfile/EducatorProfile";
import LoginCard from "../../LoginCard/LoginCard";
import EntryPage from "../../EducatorProfile/EntryPage";
import UpdateEducatorForm from "../../EducatorForms/UpdateEducatorForm";
import HistoryPage from "../Statsbar/HistoryPage";
import AdminSignIn from "../../LoginCard/AdminSignin";
import SupervisorPage from "../../Supervisor/SupervisorPage";

const Container = () => {
  const [page, setPage] = useContext(PageContext);
  const [entry, setEntry] = useContext(EntryContext);
  const [educator, setEducator] = useContext(EducatorContext);

  const [formType, setFormType] = useState();
  const [formQuestions, setFormQuestions] = useState();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    Object.values(FORMS).map((el) => {
      if (page === el[0]) {
        setShowForm(true);
        setFormType(el[0]);
        setFormQuestions(el[1]);
      }
    });
    Object.values(PAGES).map((el) => {
      if (page === el) setShowForm(false);
    });
  }, [page]);

  return (
    <div
      className={
        page === PAGES.dashboard_page
          ? `${classes.container} ${classes.dashboard}`
          : `${classes.container}`
      }
    >
      {page === PAGES.login_page && <LoginCard />}
      {page === PAGES.banner_page && <Banner />}
      {page === PAGES.new_educator_form && <NewEducatorForm />}
      {page === PAGES.update_educator_form && <UpdateEducatorForm />}
      {page === PAGES.dashboard_page && <Dashboard />}
      {page === PAGES.profile_page && <Profile />}
      {page === PAGES.history_page && <HistoryPage />}
      {page === PAGES.educator_profile_page && <EducatorProfile />}
      {page === PAGES.entry_page && (
        <EntryPage entry={entry} educator={educator} />
      )}
      {page === PAGES.admin_signin && <AdminSignIn />}
      {page === PAGES.supervisor_page && <SupervisorPage />}

      {showForm && (
        <CheckForm
          key={formType}
          formType={formType}
          formQuestions={formQuestions}
        />
      )}
    </div>
  );
};

export default Container;
