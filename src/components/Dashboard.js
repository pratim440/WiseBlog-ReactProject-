import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./../styles/Dashboard.scss";
import Card from "./subComponents/Card";
import Preloader from "./subComponents/Preloader";

function Dashboard() {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setloading] = useState(true);
  const history = useHistory();

  const checkUser = JSON.parse(sessionStorage.getItem("user"));
  if (!checkUser) history.push("/signIn");

  useEffect(() => {
    if (checkUser) {
      const filteredBlogs = blogs.filter(
        (blog) => blog.email === user[0].email
      );
      setUserBlogs(filteredBlogs);
      console.log(userBlogs);
    } else {
      history.push("/signIn");
    }
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, [blogs]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {!userBlogs ? (
            <h1 className="text-center mt-5 pt-5">
              You dont have any blogs yet. Crete now.
            </h1>
          ) : (
            <div className="dashboardContainer">
              <div className="col-lg-10">
                <h1 className="text-center w-100">Dashboard</h1>
                <div className="row">
                  {userBlogs.map((blog) => (
                    <Card
                      imgUrl={blog.imgUrl}
                      title={blog.title}
                      desc={blog.desc}
                      name={blog.name}
                      id={blog._id}
                      date={blog.createdAt}
                      type="dashboard"
                      like={blog?.likes?.length}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
