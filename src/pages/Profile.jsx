import { sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users", null, [
    "uid",
    "==",
    auth.currentUser.uid,
  ]);

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check Your Email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
      });
  };

  return (
    <div>
      <img
        src={user.photoURL}
        alt=""
        width={100}
        height={100}
        className="userProfilePhoto"
      />
      <h3>{user.displayName}</h3>
      <div>
        <h3>{user.email}</h3>
        <small>
          {user.emailVerified ? (
            <p>Email Verified 👌</p>
          ) : (
            <>
              <p>Email Not Verified</p>
              <button onClick={sendEmailLink} className="btn">
                Send Verification Link
              </button>
            </>
          )}
        </small>
      </div>
    </div>
  );
}

export default Profile;
