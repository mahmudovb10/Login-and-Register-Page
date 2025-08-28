const formError = (user) => {
  if (!user.name) return <p className="nameErr">Name is required</p>;
  if (!user.email) return <p className="emailErr">Email is required</p>;
  if (!user.password)
    return <p className="passwordErr">Password is required</p>;
  return false;
};
export default formError;

export function getFirebaseErrorMessage(error) {
  if (!error || !error.code) return "Noma'lum xatolik yuz berdi";

  switch (error.code) {
    case "auth/email-already-in-use":
      return " Bu email bilan allaqachon hisob ochilgan. Boshqa email kiriting.";
    case "auth/invalid-email":
      return " Email manzili noto‘g‘ri kiritilgan";
    case "auth/weak-password":
      return " Parol juda kuchsiz (kamida 6 ta belgidan iborat bo‘lishi kerak)";
    case "auth/user-not-found":
      return " Hisob topilmadi yoki email noto‘g‘ri";
    case "auth/network-request-failed":
      return " Internet aloqangizni tekshiring va qayta urinib ko‘ring";
    case "auth/wrong-password":
      return " Parol noto‘g‘ri";

    default:
      return " Noma'lum xatolik yuz berdi. Qayta urinib ko‘ring.";
  }
}
