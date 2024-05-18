import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CMain } from "../pages/main";
import { actionPost } from "../actions/promises";
import { Link } from "react-router-dom";
import image from "../img/logo.png";
import { fullActionPost } from "../gql/scripts";
const Post = ({ onPost, post }) => {
  console.log(post);

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (flag) {
      onPost();
      setFlag(false);
    }
  }, [flag]);

return (
<>
    <CMain></CMain>
    <div className="container">
    <div>
    </div>
    <div className="commentText">
        <p>{post}</p>
    </div>
    <button href="#" className="btnComment">
        <Link to={`/comment`}>  Comments section </Link>
    </button>
    </div>
</>
);
};

export const CPost = connect(
  (state) => ({ post: state?.promise?.actionPost?.payload || [] }),
  { onPost: fullActionPost }
)(Post);