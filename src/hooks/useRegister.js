import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorIfd";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const register = async (name, email, password) => {
    try {
      setIsPending(true);

      const req = await createUserWithEmailAndPassword(auth, email, password);

      if (!req.user) {
        throw new Error("Register failed");
      }

      await updateProfile(req.user, {
        displayName: name,
      });

      dispatch(login(req.user));
      console.log("User registered:", req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { register, isPending, error };
};
