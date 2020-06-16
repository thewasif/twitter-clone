export const redirectTo = (url) => {
  window.location.pathname = url;
};

export const formattedDate = (str) => {
  let dateString = String(new Date(str)).split(" ");
  let month = dateString[1],
    date = dateString[2],
    year = dateString[3],
    time = dateString[4].substring(0, 5);

  return {
    date,
    month,
    year,
    time,
  };
};

export const USER_ID = localStorage.getItem("logged_in_user_id");
export const JWT_TOKEN = JSON.parse(localStorage.getItem("JWT_TOKEN"));

export const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
