import React, { useState } from "react";
import { connect} from "react-redux";
import {Link} from "react-router-dom";
import { actionOnePost,actionCreateComment } from "../gql/scripts";
import { CMain } from "../pages/main";
const Comments = ({ onepost,onComment }) => {
let { comments = [] } = onepost;
const [comment, setComment] = useState("");
const [submit, setSubmit] = useState("");
return (
    <>
    <CMain/>
    <div className="cont" >
        <h1>Comments:</h1>
        <div className="inputCont">
        <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            className="commentinput"
            placeholder="add your comment"
        />
        </div>

        <div >
        <button
            onClick={(e) => setSubmit(e.target.value)}
            disabled={comment.length < 1}
            type="submit"
            className="ButtonComment"><Link to={`/post`}>+</Link></button>
        </div>
        
        {comments.map((comm) => (
        <div
            key={Math.random()}
            className="commenysConatiner"
        >
            <div>
            <p>Comment: {comm?.text}</p>
            <p>ID : {comm?.owner?._id}</p>
            </div>
        </div>
        ))}
    </div>
    </>
);
};
export const CComments = connect((state) => ({ onepost: state.promise.actionOnePost?.payload || [] ,state: state.promise.actionCreateComment?.payload || []}),
{onComment: actionCreateComment})(Comments);