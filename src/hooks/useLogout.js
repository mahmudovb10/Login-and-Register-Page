import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../components/ErrorIfd";
import { logout } from "../features/userSlice";
import { useDispatch } from "react-redux";

export function useLogout() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const _logout = async () => {
    try {
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
