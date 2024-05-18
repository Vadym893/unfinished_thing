import React,{useEffect,useState} from "react";
import { connect } from "react-redux";
import { actionFullChangeNick } from "../gql/scripts";
import { Link } from "react-router-dom";
import {CMain} from "../pages/main"
const NickChange = ({ onChangeNick, id,fullUser }) => {
    const [nick, setNick] = useState(" ");
    useEffect(() => {
        setNick(nick);
    }, [nick]);
    return (
      <>
      <CMain></CMain>
        <div className="container">
          <h1 className="h2">changeNick:</h1>
          <div >
            <p>Last nick: {fullUser.nick}</p>
            <h2>Your new nick:</h2>
            <input
              type="text"
              className="inputNick"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="createNick"
            onClick={() => onChangeNick(nick, id)}  
          >
            <Link to={`/myinfo`}>Submit</Link>
          </button>
        </div>
      </>
    );
  };
  
  export const CNickChange = connect(
    (state) => ({
      id: state?.auth?.payload?.sub?.id,
      fullUser: state?.promise?.actionInfoAboutUser?.payload || []
    }),
    {
      onChangeNick: actionFullChangeNick,
    }
  )(NickChange);