import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./../subComponents/styles/Card.scss";
import { useDispatch, useSelector } from "react-redux";
import { likePost, dislikePost } from "./../../api/post";
import axios from "axios";

function Card({ imgUrl, title, desc, id, name, date, type, like }) {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleDelete = (id) => {
    axios
      .post(`https://wiseblog-backend.herokuapp.com/blogs/delete/${id}`)
      .then((res) => {
        dispatch({ type: "DELETE", payload: id });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const getBlog = blogs?.find((blog) => blog._id === id);
    const checkLike = getBlog?.likes?.find((like) => like === user[0]?.email);
    if (checkLike) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      console.log("not liked uf");
    }
  }, []);

  const handleLike = (id, email) => {
    const getBlog = blogs.find((blog) => blog._id === id);
    const checkLike = getBlog.likes.find((like) => like === user[0].email);

    if (checkLike) {
      console.log("liked already");
      dislikePost(id, email);
      dispatch({ type: "DISLIKE_POST", payload: { id, email } });
      setIsLiked(true);
      setLikes(likes - 1);
    } else {
      console.log("liked not");
      likePost(id, email);
      dispatch({ type: "LIKE_POST", payload: { id, email } });
      setIsLiked(false);
      setLikes(likes + 1);
    }
  };

  return (
    <div className="col-sm-12 col-md-6 h-25 col-lg-4">
      <div className="card shadow-lg mb-5 bg-white rounded">
        <img src={imgUrl} className="card-img-top" alt="..." height="300px" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h4 className="card-text">
            {`${desc?.substring(0, 100)} . . .  `}
            <NavLink to={`/view/${id}`}>Read more</NavLink>
          </h4>
          <p>
            -- By {name}, {`${new Date(date).getDate()}`}/
            {`${new Date(date).getMonth() + 1}`}/
            {`${new Date(date).getFullYear()}`}
          </p>

          <div className="card_footer">
            <div className="card_footer_btn">
              {user.length > 0 ? (
                <>
                  <button
                    type="button"
                    className="btn nav-btn mr-5 p-2"
                    onClick={() => handleLike(id, user[0].email)}
                  >
                    {isLiked ? (
                      <i className="far fa-thumbs-up"></i>
                    ) : (
                      <i className="fas clickLike fa-thumbs-up"></i>
                    )}
                  </button>
                  <p>{`${like + likes}`} likes</p>
                </>
              ) : (
                <p className="noUser">{`${like + likes}`} likes</p>
              )}
            </div>
            {type === "dashboard" ? (
              <div className="card_footer_btn">
                <button
                  type="button"
                  className="btn nav-btn btn-info mr-5 p-2"
                  onClick={() => {
                    history.push(`/editBlog/${id}`);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn nav-btn btn-danger mr-5 p-2"
                  onClick={() => handleDelete(id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
