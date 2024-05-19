import React, { useState, useEffect, useContext } from "react";
import "./posts.styles.scss";
import Comments from "../comments/comments.components";
import { CommunityContext } from "../../utilities/context/community.context";

const Posts = () => {
  const { postData, commentData, setPostData } = useContext(CommunityContext);
  const [sortedPosts, setSortedPosts] = useState([]);

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

  return (
    <div className="postsContainer">
      {sortedPosts.map((data, index) => {
        return (
          <div className="postsContentsContainer" key={data.ID}>
            <p>{data.postDescription}</p>
            <hr />
            <div>
              <div>{data.likedBy.length} Liked</div>
              <div onClick={() => enableComment(data.ID)}>Comment</div>
            </div>
            {data.commentStatus && (
              <Comments
                commentDatas={commentData}
                postID={data.ID}
                enableComment={enableComment}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
