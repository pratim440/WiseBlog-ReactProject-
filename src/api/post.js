import axios from "axios";

const url = "https://wiseblog-backend.herokuapp.com/blogs";

export const likePost = (id, email) => {
  axios
    .post(`${url}/like/${email}/${id}`)
    .then((res) => {
      console.log("liked");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const dislikePost = (id, email) => {
  axios
    .post(`${url}/dislike/${email}/${id}`)
    .then((res) => {
      console.log("disliked");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
