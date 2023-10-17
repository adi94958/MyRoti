function CekLogin() {
  const user = JSON.parse(localStorage.getItem("dataLogin"));
  if (user === null) {
    return null;
  } else if (user.user_type === "admin") {
    return 1;
  } else if (user.user_type === "koordinator") {
    return 2;
  }
  return null; 
}

export default CekLogin;
