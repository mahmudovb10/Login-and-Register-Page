import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useState, useEffect } from "react";
import loginError from "../components/loginError";
import { useResetPassword } from "../hooks/useResetPassword";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const { _login, _error, isPending } = useLogin();
  const user = useActionData();
  console.log(user);
  const [error, setError] = useState(null);
  const { resetPassword } = useResetPassword();
  const [forgetPassword, setForgetPassword] = useState(false);
  const { login } = useLogin();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? loginError(user) : false);
    }
    if (user?.emailRecovery) {
      resetPassword(user.emailRecovery);
      setError(false);
    }
  }, [user]);

  return (
    <div className="log">
      <h1 className="loginTitle">
        Login, <br />
        <span>Welcome Back</span>
      </h1>
      <p className="loginDesc">Hey, welcome back to your special place</p>
      {!forgetPassword && (
        <Form method="post" className="allForm">
          <FormInput
            type="email"
            label="Email:"
            name="email"
            className="emailInp"
          />
          <FormInput
            type="password"
            label="Password:"
            name="password"
            className="passwordInp"
          />
          {!isPending && <button className="loginBtn">Login</button>}
          {isPending && <button className="loginBtn">Loading...</button>}
        </Form>
      )}
      {forgetPassword && (
        <Form method="post" className="allForm">
          <FormInput
            type="email"
            label="Email:"
            name="emailRecovery"
            className="emailInp"
          />
          <button>Send</button>
        </Form>
      )}

      {!forgetPassword && (
        <button
          className="forgotPassLog"
          onClick={() => setForgetPassword(!forgetPassword)}
        >
          Forget Password
        </button>
      )}
      {forgetPassword && (
        <button
          className="forgotPassLog"
          onClick={() => setForgetPassword(!forgetPassword)}
        >
          Show Login
        </button>
      )}

      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>

      <p className="loginText">
        Don't have an account?
        <Link to="/register" className="linkLog">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
