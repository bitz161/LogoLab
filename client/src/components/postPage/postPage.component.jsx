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
            <button>Submit</button>
            <button>Clear</button>
          </form>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default PostPage;
