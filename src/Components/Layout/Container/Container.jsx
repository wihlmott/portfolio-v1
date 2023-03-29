import { useContext } from "react";
import {
  EducatorContext,
  EntryContext,
  PageContext,
} from "../../Context/Context";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../../Profile/Profile";
import NewEducatorForm from "../../EducatorForms/NewEducatorForm";
import classes from "./Container.module.css";
import Banner from "../Container/Banner";
import CheckForm from "../../Forms/CheckForm";
import {
  AssessmentCheckFormQuestions,
  FORMS,
  PAGES,
  PlanningCheckFormQuestions,
} from "../../Config";
import EducatorProfile from "../../EducatorProfile/EducatorProfile";
import LoginCard from "../../LoginCard/LoginCard";
import EntryPage from "../../EducatorProfile/EntryPage";
import UpdateEducatorForm from "../../EducatorForms/UpdateEducatorForm";

const Container = () => {
  const [page, setPage] = useContext(PageContext);
  const [entry, setEntry] = useContext(EntryContext);
  const [educator, setEducator] = useContext(EducatorContext);

  return (
    <div className={classes.container}>
      {page === PAGES.login_page && <LoginCard />}
      {page === PAGES.banner_page && <Banner />}
      {page === PAGES.new_educator_form && <NewEducatorForm />}
      {page === PAGES.update_educator_form && <UpdateEducatorForm />}
      {page === PAGES.dashboard_page && <Dashboard />}
      {page === PAGES.profile_page && <Profile />}
      {page === PAGES.educator_profile_page && <EducatorProfile />}
      {page === FORMS.assessment_check_form && (
        <CheckForm
          formType={`Assessment File Check`}
          formQuestions={AssessmentCheckFormQuestions}
        />
      )}
      {page === FORMS.planning_check_form && (
        <CheckForm
          formType={`Planning File Check`}
          formQuestions={PlanningCheckFormQuestions}
        />
      )}
      {page === PAGES.entry_page && (
        <EntryPage entry={entry} educator={educator} />
      )}
    </div>
  );
};

export default Container;
