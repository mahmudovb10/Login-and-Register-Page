import { Link, useActionData, Form } from "react-router-dom";
import FormInput from "../components/FormInput";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Register() {
  const user = useActionData();
  console.log(user);

  return (
    <div>
      <h1>Register</h1>

      <Form method="post">
        <FormInput type="text" label="Name" name="name" />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        <button>Register</button>
      </Form>

      <p>
        If you have account, please <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
