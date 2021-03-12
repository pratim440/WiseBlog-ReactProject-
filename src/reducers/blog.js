export default (blogs = [], action) => {
  switch (action.type) {
    case "GET":
      return action.payload;
    case "CREATE":
      return [action.payload, ...blogs];
    case "UPDATE":
      const { id, title, desc, imgUrl } = action.payload;
      const blog = blogs.filter((blog) => blog._id === id);
      const updatedBlogs = blogs.filter((blog) => blog._id !== id);
      blog[0].title = title;
      blog[0].desc = desc;
      blog[0].imgUrl = imgUrl;
      blog[0].createdAt = new Date();
      return [...blog, ...updatedBlogs];
    case "DELETE":
      const filterBlogs = blogs.filter((blog) => blog._id !== action.payload);
      return filterBlogs;

    case "LIKE_POST":
      //const { id, email } = action.payload;
      const filterLike = blogs.filter((blog) => blog._id === action.payload.id);

      filterLike[0].likes.push(action.payload.email);
      return blogs;
    case "DISLIKE_POST":
      // const { id, email } = action.payload;
      const filterDislike = blogs.filter(
        (blog) => blog._id === action.payload.id
      );

      const updatedBlogsDislike = filterDislike[0].likes.pop(
        action.payload.email
      );
      return blogs;
    default:
      return blogs;
  }
};
