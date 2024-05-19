import React, { useState, useEffect } from "react";
import "./comments.styles.scss";

const Comments = ({ commentDatas, postID, enableComment }) => {
  const [sortedComments, setSortedComments] = useState([]);

  // Function to sort and update comments whenever commentDatas or postID changes
  useEffect(() => {
    const filteredComments = commentDatas.filter(
      (comment) => comment.postID === postID
    );
    const sorted = filteredComments.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    );
    setSortedComments(sorted);
  }, [commentDatas, postID]);

  return (
    <div className="commentContainer">
      {sortedComments.map((comment, index) => (
        <div key={index}>{comment.commentText}</div>
      ))}
    </div>
  );
};

export default Comments;
