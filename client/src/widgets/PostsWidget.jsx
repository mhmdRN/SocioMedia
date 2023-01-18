import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import PostWidget from "../widgets/PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    await axios
      .get("http://localhost:5000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        dispatch(authActions.setPosts({ posts: data }));
      })
      .catch((error) => console.log(error.message));
  };

  const getUserPosts = async () => {
    await axios
      .get(`http://localhost:5000/posts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        dispatch(authActions.setPosts({ posts: data }));
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts(); // eslint-disable-next-line
  }, []);

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            location={location}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};
export default PostsWidget;
