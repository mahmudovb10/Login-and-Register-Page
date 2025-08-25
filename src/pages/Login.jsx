import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const user = useActionData();
  console.log(user);

  return (
    <div>
      <h1 className="loginTitle">
        Login, <br />
        <span>Welcome Back</span>
      </h1>
      <p className="loginDesc">Hey, welcome back to your special place</p>
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
        <button className="loginBtn">Login</button>
      </Form>
      <p className="loginText">
        Don't have an account?
        <Link to="/register" className="linkLog">
          Register
        </Link>
      </p>
      <img src="./images/loginImage.webp" alt="" className="mainImg" />
    </div>
  );
}

export default Login;
