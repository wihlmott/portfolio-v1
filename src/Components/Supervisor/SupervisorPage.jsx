import { useEffect, useState } from "react";
import { retrieveAllUsers } from "../../Firebase";
import EducatorBtn from "../Layout/Dashboard/EducatorBtn";
import { useContext } from "react";
import { AdminContext, SupervisorContext } from "../Context/Context";

const SupervisorPage = () => {
  const [admin] = useContext(AdminContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    retrieveAllUsers(admin).then((res) => setAllUsers(res));
  }, []);

  return (
    <>
      {allUsers.map((el) => {
        return (
          <div style={{ marginTop: "6px" }} key={el}>
            <EducatorBtn educator={el} />
          </div>
        );
      })}
    </>
  );
};

export default SupervisorPage;
