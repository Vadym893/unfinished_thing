import { CMain } from "../pages/main";
import {Link} from "react-router-dom";
import image from "../img/postpic.webp"
import React, { useState,useEffect, } from "react";
import { connect } from "react-redux";
import {fullActionAllPosts } from "../gql/scripts";
const OneImage = ({ post = {}, images = [] }) => {
  //console.log(images);
  const backendURL= "http://hipstagram.node.ed.asmer.org.ua/graphql"
  return (
    
    <>
      <div className="contMain">
        <div >
          <Link to={`/post/${post?._id}`}>
            {images?.url === undefined || images?.url === null ? (
              <img className="imageforpost" src={image} />
            ) : (
              <img
                
                src={`${backendURL}${images?.url}`}
              />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export const MainPage=({ posts = [],  onPost }) => {

  const [flag, setFlag] = useState(true);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (flag && fetch) {
      onPost();
      setFlag(false);
      setFetching(false);
    }
  }, [flag, fetching]);

  
  return (
    <>
      <CMain/>
      <div className="container">
        <h1 className="PostsHeader" >Posts</h1>
        
        {posts.length <= 1 ? (
          <div>
            <p >You have no posts yet</p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <div
                key={Math.random()}
                className="PostKeeperMain"
              >
                <div>
                  <OneImage post={post} images={post?.images} />
                  <p className="TextPost">Nick: {post?.owner?.nick}</p>
                  <p className="TextPost">Comments: {post?.text}</p>

                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
      
    </>
  );
}

export const CMainPage = connect(
  (state) => ({ posts: state?.promise?.actionAllPosts?.payload || [] ,}),
  { onPost: fullActionAllPosts }
)(MainPage);