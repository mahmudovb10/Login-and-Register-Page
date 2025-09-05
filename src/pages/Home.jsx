import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { useState } from "react";
import CreateTask from "./CreateTask";
import { Link } from "react-router-dom";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users");
  const { data: tasks } = useCollection("tasks");

  const [messages, setMessages] = useState({});

  const handleChange = (uid, value) => {
    setMessages((prev) => ({ ...prev, [uid]: value }));
  };

  const handleSend = (uid) => {
    setMessages((prev) => ({ ...prev, [uid]: "" }));
  };

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
        <Link to="/create" className="btn btn-primary">
          Create Task
        </Link>
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
              <div className="userOnOf">
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
              </div>
              <label htmlFor={`modal-${user.uid}`} className="btn btn-primary">
                Send Message
              </label>

              {/* Modal */}
              <input
                type="checkbox"
                id={`modal-${user.uid}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">{user.displayName}</h3>
                  <textarea
                    className="textarea textarea-bordered w-full my-4"
                    placeholder={`Write a message to ${user.displayName}`}
                    value={messages[user.uid] || ""}
                    onChange={(e) => handleChange(user.uid, e.target.value)}
                  />
                  <div className="modal-action">
                    <label htmlFor={`modal-${user.uid}`} className="btn">
                      Close
                    </label>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleSend(user.uid)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <ul className="tasks__list">
        {tasks &&
          tasks.map((task) => {
            return (
              <li key={task.uid}>
                <Link to={`/task/${task.uid}`}>
                  <h5>{task.title}</h5>

                  <div>
                    {task.attachedUsers.map((user) => {
                      return (
                        <div
                          key={task}
                          className="tooltip"
                          data-tip={user.displayName}
                        >
                          <img
                            src={user.photoURL}
                            alt=""
                            width={15}
                            height={15}
                            style={{ borderRadius: "50%" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Home;
