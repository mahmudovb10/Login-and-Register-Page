import { sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";
import getRandomGradient from "../utils";
import { useEffect, useRef, useState } from "react";
import useLogout from "../hooks/useLogout";

function Profile() {
  const { _logout, error, isPending } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const { data } = useCollection("users", null, [
    "uid",
    "==",
    auth.currentUser.uid,
  ]);

  const [bgImage, setBgImage] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedBg = localStorage.getItem("profileBg");
    if (savedBg) {
      setBgImage(savedBg);
    }
  }, []);

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Check Your Email");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setBgImage(inputValue.trim());
      localStorage.setItem("profileBg", inputValue.trim());
      setInputValue("");
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <div
        className="userInlineBg"
        style={{
          backgroundImage: bgImage
            ? `url(${bgImage})`
            : data?.bgURL
            ? `url(${data.bgURL})`
            : getRandomGradient(),
        }}
      />

      <img
        src={user.photoURL}
        alt="user profile"
        width={100}
        height={100}
        className="userProfilePhoto"
      />

      <form className="setUrl" onSubmit={handleSubmit}>
        <input
          type="url"
          className="input setUrlInp"
          placeholder="Rasm URL kiriting"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="btn setBtn">
          Add
        </button>
      </form>

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
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              ✅ Rasm muvaffaqiyatli qo‘shildi!
            </h3>
            <p className="py-4">Yangi fon rasmi saqlandi.</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Yopish
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Profile;
