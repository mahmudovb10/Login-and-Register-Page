const loginError = (user) => {
  if (!user.email) return <p className="emailErr">Email is required</p>;
  if (!user.password)
    return <p className="passwordErr">Password is required</p>;
  return false;
};
export default loginError;
