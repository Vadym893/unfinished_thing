import {Link} from "react-router-dom";
import defaultPhoto from "../img/defaultPHoto.png"
import { store } from "../actions/reducers";
import React, { useState,useEffect, } from "react";
import image from "../img/postpic.webp"
import { connect } from "react-redux";
import { actionAuthLogout } from "../actions/promises";
import { fullActionMinePosts } from "../gql/scripts";
import { CMain } from "./main";

const OneImage = ({ post = {}, images = [] }) => {

  return (
    
    <>
      <div className="contUser ">
        <div>
          <Link to={`/post/${post?._id}`}>
            {images?.url === undefined || images?.url === null ? (
              <img className="imageforpost" src={image} />
            ) : (
              <img
                
                src={`${"http://hipstagram.node.ed.asmer.org.ua/graphql"}${images?.url}`}
              />
            )}
          </Link>
        </div>
      </div>
    </>
  );
};
export const MyInfo=({ posts = [],  onPost ,user,fullUser }) => {
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
      <div className="containerUserInfo">
        <div className="idNickDiv">
          <div className="containerMyInfo">
            <div className="background-img">
              <div className="boxBox">
                <div className="content">
                  <div className="background">
                    <div className="shape"></div>
                    <div className="shape"></div>
                  </div>
                  {user?.avatar?.url === null || user?.avatar?.url === undefined ? (
                    <img className='imgHolder' src={defaultPhoto} />
                  ) : (
                    <img
                    className='imgHolder'
                      src={"hipstagram.node.ed.asmer.org.ua/" + user?.avatar?.url}
                    />
                  )}
                </div>
              </div>
            </div>
            
          </div>
          <div className='info'>
              <p>Login: {user?.login || "No Login"}</p>
              <p>User nick: {fullUser?.nick || "No nick yet"}</p>
          </div>
            
        </div> 
          </div> 
          
          <div className="buttonsInfo">
            <button className="buttonNyInfo" type="button">
              <Link to={`/settings`} className="libkMyInfo">Set nick</Link>
            </button>
            <button className="buttonNyInfo" type="button" onClick={()=>store.dispatch(actionAuthLogout())}>
              <Link to={`/login`}>Log out</Link>
            </button>
            
        </div>   
        <div className="containerInfo">
          <h1 className="PostsHeader" >Posts</h1>
          
          {posts.length <= 1 ? (
            <div>
              <p className="non-info">You have no posts yet</p>
              

            </div>
          ) : (
            <div className="postsJustify">
              {posts.map((post) => (
                <div
                  key={Math.random()}
                  className="PostKeeper"
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
      
    
        <button type="button" className="burronCreatePost" >
        <Link to={`/createpost`}>+</Link>
      </button>
    </>
  );
}

export const CMyInfo = connect((state) => ({
  user: state?.auth?.payload?.sub || [],
  posts: state?.promise?.actionAllPosts?.payload || [] ,
  fullUser: state?.promise?.actionInfoAboutUser?.payload || []
}),{ onPost: fullActionMinePosts })(MyInfo);