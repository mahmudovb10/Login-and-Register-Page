import { auth } from "../firebase/config";
import formError from "../components/ErrorIfd";
import { sendPasswordResetEmail } from "firebase/auth";

export const useResetPassword = () => {
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "https://login-and-register-page-rosy.vercel.app/",
      });

      alert("Check your email");
    } catch (error) {
      const errorMessage = error.message;
      formError(error.Message);
    }
  };

  return { resetPassword };
};
