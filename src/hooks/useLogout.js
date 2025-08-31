import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../components/ErrorIfd";
import { logout } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

export function useLogout() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.user);

  const _logout = async () => {
    try {
      const useRef = doc(db, "users", user.uid);

      await updateDoc(useRef, {
        online: false,
      });

      setIsPending(true);
      await signOut(auth);
      dispatch(logout());
      console.log("User logged out");
    } catch (error) {
      setError(getFirebaseErrorMessage(error));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
}

export default useLogout;
