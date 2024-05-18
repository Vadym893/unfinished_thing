import React, { useState, useEffect } from "react";
import { actionFullCreatePost } from "../gql/scripts";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CMain } from "../pages/main";


export const CreatePost = ({ onCreatePost,idOfPost}) => {
  const [text, setText] = useState("");
  return (
    <>
      <CMain></CMain>
      <div className="container">
        <div className="background-img">
          <div className="box">

            <div className="content">
              <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
              </div>
              <form>
                <div className="card">
                  <div className="drag-border">

                
                </div>
                  <div className="card-bodyPost">
                    <textarea
                      className="textPost"
                      placeholder="Your Comments"
                      rows="3"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>

                    <button
                      href="#"
                      className="createPost"
                      onClick={() => onCreatePost({ text,idOfPost })}
                    >
                      <Link to={`/main`}> Add Post</Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const CCreatePost = connect(
  (state) => ({
    idOfPost: state?.promise?.actionCreatePost?.payload?._id,
  }),
  {
    onCreatePost: actionFullCreatePost,
  }
)(CreatePost);

