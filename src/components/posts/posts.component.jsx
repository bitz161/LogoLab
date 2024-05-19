import React, { useState, useEffect, useContext } from "react";
import "./posts.styles.scss";
import Comments from "../comments/comments.components";
import { CommunityContext } from "../../utilities/context/community.context";
import { UserContext } from "../../utilities/context/user.context";

const Posts = () => {
  const { postData, commentData, setPostData } = useContext(CommunityContext);
  const [sortedPosts, setSortedPosts] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    // Function to sort posts by dateCreated
    const sortByDateCreated = (a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    };

    // Sort postData by dateCreated
    const sortedPosts = postData.slice().sort(sortByDateCreated);
    setSortedPosts(sortedPosts);
  }, [postData]);

  //change the status of the comment if show or not
  const enableComment = (id) => {
    const updatedPostData = postData.map((post) =>
      post.ID === id ? { ...post, commentStatus: !post.commentStatus } : post
    );
    setPostData(updatedPostData);
  };

  const likePost = (id) => {
    if (!currentUser) {
      return;
    }

    const updatedPostData = postData.map((post) => {
      if (post.ID === id) {
        const likedIndex = post.likedBy.findIndex(
          (like) => like.userID === currentUser.uid
        );
        if (likedIndex !== -1) {
          // User already liked the post, remove the like
          const updatedLikedBy = [...post.likedBy];
          updatedLikedBy.splice(likedIndex, 1);
          return {
            ...post,
            likedBy: updatedLikedBy,
          };
        } else {
          // User hasn't liked the post yet, add the like
          return {
            ...post,
            likedBy: [
              ...post.likedBy,
              {
                userID: currentUser.uid,
                username: currentUser.displayName,
                displayProfile: currentUser.displayProfile,
              },
            ],
          };
        }
      } else {
        return post;
      }
    });
    setPostData(updatedPostData);
  };

  return (
    <div className="postsContainer">
      {sortedPosts.map((data, index) => {
        return (
          <div className="postsContentsContainer" key={data.ID}>
            <div className="posterInfoContainer">
              <img src={data.createdBy.displayProfile} alt="Poster Avatar" />
              <div>{data.createdBy.username}</div>
            </div>
            <p>{data.postDescription}</p>
            <hr />
            <div>
              <div onClick={() => likePost(data.ID)}>
                {data.likedBy.length} Liked
              </div>
              <div onClick={() => enableComment(data.ID)}>Comment</div>
            </div>
            <div>
              {data.commentStatus && (
                <Comments
                  commentDatas={commentData}
                  postID={data.ID}
                  enableComment={enableComment}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
