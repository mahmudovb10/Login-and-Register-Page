import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorIfd";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const _login = async (email, password) => {
    try {
      setIsPending(true);
      const req = await signInWithEmailAndPassword(auth, email, password);

      if (!req.user) {
        throw new Error("Login faied )");
      }
      await updateProfile(req.user, {
        displayName: name,
      });
      dispatch(login(req.user));
      console.log(req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _login, isPending, error };
};
