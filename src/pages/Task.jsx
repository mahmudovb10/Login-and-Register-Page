import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";

function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    const newComment = {
      text: comment,
      uid: user.uid,
      id: Math.random(),
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    const commentRef = doc(db, "tasks", id);

    await updateDoc(commentRef, {
      comments: [...(data.comments || []), newComment],
    });

    e.target.reset();
  };

  if (!data) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="task">
      <h1 className="taskTitle">Task - {data.title}</h1>

      <div>
        {!data.comments || data.comments.length === 0 ? (
          "No Comments"
        ) : (
          <div>
            {data.comments.map((comment) => {
              return (
                <div key={comment.id} className="chat chat-start publicChat">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        className="otherUser"
                        src={comment.photoURL}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="chat-bubble"
                    style={{
                      backgroundColor:
                        user.uid === comment.uid
                          ? "rgb(179, 222, 113)"
                          : "none",
                    }}
                  >
                    <span className="font-semibold mr-2 userDisplayName">
                      {comment.displayName}
                    </span>
                    <div className="userText">{comment.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="commentItems">
        <img className="userPhoto" src={user.photoURL} alt="" />
        <input
          type="text"
          placeholder="Write a Message..."
          name="comment"
          className="input commentInput"
          required
        />
        <button className="btn sendBtn">
          <FiSend size={20} />
        </button>
      </form>
    </div>
  );
}

export default Task;
