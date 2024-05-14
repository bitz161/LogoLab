import Posts from "../posts/posts.component";
import Sidebar from "../sidebar/sidebar.component";
import "./postPage.styles.scss";

const PostPage = () => {
  return (
    <div className="postpageContainer">
      <Sidebar />
      <section>
        <div className="post">
          <form className="">
            <input placeholder="Enter Post" />
            <div className="postButtonContainer">
              <button class="rounded-none">Submit</button>
              <button>Clear</button>
            </div>
          </form>
        </div>
        <Posts />
      </section>
    </div>
  );
};

export default PostPage;
