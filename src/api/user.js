import axios from "axios";

const url = "http://localhost:5000/blogs/";

// export const signUp = axios.post(`${url}/signUp`, userDetails);
// export const signUp = axios.post(`${url}/signIn`, userDetails);
export const getBlogs = () =>
  axios
    .get(`${url}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
