import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import formError from "../components/ErrorIfd";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, _error } = useRegister();

  const {
    googleProvider,
    isPending: isPendingGoogle,
    error: errorGoogle,
  } = useGoogle();

  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user.name, user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  return (
    <div className="reg">
      <h1 className="loginTitle">
        Register, <br />
        <span>Welcome Back</span>
      </h1>
      <p className="loginDesc">Hey, welcome back to your special place</p>
      <Form method="post" className="allForm">
        <FormInput type="text" label="Name:" name="name" className="nameInp" />
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
        {!isPending && <button className="loginBtn">Register</button>}
        {isPending && (
          <button className="loginBtn" disabled>
            Loading...
          </button>
        )}
        {!isPendingGoogle && (
          <button
            className="btn googleBtn"
            type="button"
            onClick={googleProvider}
          >
            Google
          </button>
        )}
      </Form>

      <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
      <div>{_error && <p style={{ color: "red" }}>{_error}</p>}</div>

      <p className="loginText">
        Already have an account?
        <Link to="/login" className="linkLog">
          Login
        </Link>
      </p>
      <h6 className="googleDesc">Or Register With</h6>
    </div>
  );
}

export default Register;
