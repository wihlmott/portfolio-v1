import { useEffect, useState } from "react";
import { retrieveAllUsers } from "../../Firebase";
import EducatorBtn from "../Layout/Dashboard/EducatorBtn";

const SupervisorPage = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    retrieveAllUsers().then((res) => setAllUsers(res));
  }, []);

  return (
    <>
      {allUsers.map((el) => {
        return (
          <div style={{ marginTop: "6px" }}>
            <EducatorBtn educator={el} key={el} />
          </div>
        );
      })}
    </>
  );
};

export default SupervisorPage;
