function CekLogin() {
  const user = JSON.parse(localStorage.getItem("dataLogin"));
  if (user.user_type === "admin") {
    return 1;
  } else if (user.user_type === "koordinator") {
    return 2;
  } else {
    return null;
  }
}

export default CekLogin