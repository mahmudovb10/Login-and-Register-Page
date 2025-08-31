const loginError = (user) => {
  if (!user.email) return <p className="emailErrLog">Email is required</p>;
  if (!user.password)
    return <p className="passwordErrLog">Password is required</p>;
  return false;
};
export default loginError;
