import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((store) => store.user);

  const sendEmailLink = () => {
    sendEmailLinkVeridication(auth.currentUser)
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
      <img src={user} alt="" width={100} height={100} />
      <h3>{user.displayName}</h3>
      <div>
        <h3>{user.email}</h3>
        <small>
          {user.emailVerified ? (
            <p>Email Verified</p>
          ) : (
            <>
              <p>Email Not Verified</p>
              <button onClick={sendEmailLink}>Send Verification Link</button>
            </>
          )}
        </small>
      </div>
    </div>
  );
}

export default Profile;
