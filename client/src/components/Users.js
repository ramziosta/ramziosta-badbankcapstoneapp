import { useState, useEffect, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <td key={i}>
              <b>User:</b> {user?.user} <b>Balance: </b>
              {user?.balance}
              <b>Account Type:</b>
              {user?.accountType}
              <b>Account Number:</b>
              {user?.accountNumber}
            </td>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
