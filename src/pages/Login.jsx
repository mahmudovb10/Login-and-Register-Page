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
      <h1>Login</h1>
      <Form method="post">
        <FormInput type="email" label="Email:" name="email" />
        <FormInput type="password" label="Password:" name="password" />
        <button>Login</button>
      </Form>
      <p>
        If you don't have account, please <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
