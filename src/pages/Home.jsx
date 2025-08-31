import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  console.log(data);
  return (
    <div className="customCont">
      <header className="header">
        <img
          src="https://api.dicebear.com/9.x/icons/svg?seed=Vivian&radius=50"
          alt="avatar"
          width={60}
          height={60}
        />
        <h3 className="title">Website</h3>
      </header>
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
        className="inlineUsers"
      >
        <img
          src={user.photoURL}
          alt=""
          width={30}
          height={30}
          style={{ borderRadius: "50%" }}
        />

        <h1 className="userName">Hello - {user.displayName}</h1>
      </div>
      {error && <div>{error}</div>}
      {!isPending && (
        <button onClick={_logout} className="btn btn-soft btn-error logoutBtn">
          Logout
        </button>
      )}
      {isPending && (
        <button disabled className="logoutBtnLoad logoutBtn">
          Loading
        </button>
      )}
      {data &&
        data.map((user) => {
          return (
            <div key={user.uid} className="usersData">
              <img
                className="usersPhoto"
                src={user.photoURL}
                alt=""
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              />
              <h4 className="usersName">{user.displayName}</h4>
              <p className="userOnOf">
                {user.online ? (
                  <div
                    style={{
                      height: "5px",
                      width: "5px",
                      backgroundColor: "greenyellow",
                      borderRadius: "50%",
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      height: "5px",
                      width: "5px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                    }}
                  ></div>
                )}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
