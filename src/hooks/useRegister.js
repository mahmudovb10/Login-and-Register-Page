import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { getFirebaseErrorMessage } from "../components/ErrorIfd";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

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
        photoURL:
          "https://api.dicebear.com/9.x/open-peeps/svg?seed=Christian" + name,
      });

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", req.user.uid), {
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        online: true,
        uid: req.user.uid,
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
