export const isLoggedIn = () => {
  return localStorage.getItem("auth") === "true";
};