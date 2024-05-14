import "./posts.styles.scss";

const Posts = () => {
  const postSampleArray = [
    {
      ID: 1,
      postDescription: "Sunset at the beach.",
      likeCount: 150,
    },
    {
      ID: 2,
      postDescription: "Delicious homemade pizza recipe.",
      likeCount: 75,
    },
    {
      ID: 3,
      postDescription: "Best coding practices for beginners.",
      likeCount: 200,
    },
    {
      ID: 4,
      postDescription: "Exploring the mountains.",
      likeCount: 300,
    },
    {
      ID: 5,
      postDescription: "Learning a new language.",
      likeCount: 220,
    },
    {
      ID: 6,
      postDescription: "Gardening tips for the spring.",
      likeCount: 90,
    },
    {
      ID: 7,
      postDescription: "The ultimate travel packing list.",
      likeCount: 140,
    },
    {
      ID: 8,
      postDescription: "Photography basics for beginners.",
      likeCount: 160,
    },
    {
      ID: 9,
      postDescription: "Top 10 books to read this year.",
      likeCount: 190,
    },
    {
      ID: 10,
      postDescription: "How to start meditating.",
      likeCount: 110,
    },
  ];

  return (
    <div className="postsContainer">
      {postSampleArray.map((data) => {
        return (
          <div className="postsContentsContainer">
            <p>{data.postDescription}</p>
            <hr />
            <div>
              <div>{data.likeCount} Liked</div>
              <div>Comment</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
