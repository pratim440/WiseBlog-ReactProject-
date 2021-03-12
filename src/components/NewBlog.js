import React, { useState } from "react";
import "./../styles/NewBlog.scss";
import InputField from "./../components/subComponents/InputField";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgData, setImgData] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const checkUser = JSON.parse(sessionStorage.getItem("user"));
  if (!checkUser) history.push("/signIn");

  const handleSubmit = (e) => {
    if (!imgData) {
      toast.error("Please select an image file.");
    } else {
      toast.info("Your file is being uploaded.");
      axios
        .post("https://api.cloudinary.com/v1_1/dfroawmn5/image/upload", imgData)
        .then((res) => {
          const imgUrl = res.data.secure_url;
          axios
            .post("https://wiseblog-backend.herokuapp.com/blogs/create", {
              email: user[0].email,
              name: user[0].name,
              title,
              desc,
              imgUrl,
            })
            .then((res) => {
              dispatch({ type: "CREATE", payload: res.data });
              history.push("/dashboard");
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

    e.preventDefault();
  };

  const handleImageUpload = async (name, files) => {
    const type = files[0].type;
    if (type === "image/jpeg" || type === "image/jpg" || type === "image/png") {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "wiseBlog");
      setImgData(data);
    } else {
      toast.error("Please select an image file.");
    }
  };

  return (
    <div className="NewBlog_container">
      <div className="card col-lg-8 col-11 shadow-lg">
        <form className="card-body" onSubmit={handleSubmit}>
          <InputField
            label="Title"
            type="text"
            placeholder="Enter Title"
            name="title"
            onChange={(name, val) => {
              setTitle(val);
            }}
            value={title}
          />
          <div className="form-group m-4">
            <label className="ml-2" for="exampleFormControlTextarea1">
              Description
            </label>
            <textarea
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              value={desc}
              className="form-control mx-2"
              id="exampleFormControlTextarea1"
              rows="7"
            ></textarea>
          </div>
          <InputField
            label="Choose Image"
            type="file"
            placeholder="Enter Title"
            name="img"
            onChange={handleImageUpload}
          />

          <button type="submit" className="mt-5 mb-3 btn btn-success">
            Create
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default NewBlog;
