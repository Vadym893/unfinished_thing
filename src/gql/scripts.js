import {
  actionPending,
  actionFulfilled,
  actionRejected,
  actionAuthLogin,
  actionCreatePost,
  actionChangeNick,
  actionChangeAvatario
} from "../actions/promises";


const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    const payload = await promise;
    dispatch(actionFulfilled(name, payload));
    return payload;
  } catch (error) {
    dispatch(actionRejected(name, error));
  }
};


const getGql = (url) => (query, variables) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {}),
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data) {
        return Object.values(data.data)[0];
      } else throw new Error(JSON.stringify(data.errors));
    });
const url = "http://hipstagram.node.ed.asmer.org.ua/graphql";
const gql = getGql(url);


export const actionRegistration = (login, password) =>
  actionPromise(
    "register",
    
      gql(`mutation register($login:String!, $password:String!){
    createUser (login: $login, password: $password) {
        _id login
    } 
}`,
      { login, password }
    )
  );

export const actionFullRegister = (login, password) => async (dispatch) => {
  let userReg = await dispatch(actionRegistration(login, password));
  console.log(userReg);
  if (userReg) {
    dispatch(actionFullLogin(login, password));
  }
};


const actionLogin = (login, password) =>
  actionPromise(
    "actionLogin",
    gql(
      `query log($login: String!, $password: String!) {
    login(login: $login, password: $password)
    }`,
      { login: login, password: password }
    )
  );

export const actionFullLogin = (login, password) => async (dispatch) => {
  const token = await dispatch(actionLogin(login, password));

  if (token) {
    await dispatch(actionAuthLogin(token));
    await dispatch(fullActionInfoAboutUser());
    console.log(token);
  } 
};


export const actionInfoAboutUser = (_id) =>
  actionPromise(
    "actionInfoAboutUser",
    gql(
      `query InfoAboutUser ($q:String) {
    UserFindOne (query: $q){
      _id
      login
      nick 
      avatar {
        url
      }
      followers {
        _id
        nick 
        avatar {
          url
        }
      }
      following {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { q: JSON.stringify([{ _id: _id }]) }
    )
  );

export const fullActionInfoAboutUser = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionInfoAboutUser(ID));
};
const actionCreatePostt = ( text ) =>
  actionPromise(
    "actionCreatePost",
    gql(
      `mutation createPost ($post:PostInput){
    PostUpsert(post:$post){
      text
      
    }
  }`,
  {post: text}
    )
  );

  export const actionFullCreatePost = (  text) => async (dispatch) => {
    const post = await dispatch(actionCreatePost(text))
    if(post) {
      await dispatch(actionCreatePostt(text))
      console.log(post)
    }

  };
  export const actionPost = (_id) =>
  actionPromise(
    "actionOnePost",
    gql(
      `query OnePost ($post:String) {
    PostFindOne (query: $post){
      _id
      text
      images {
        url
      }
      comments {
        _id
        text
        owner {
          _id
          nick 
          avatar {
            url
          }
        }
      }
      owner {
        _id
        nick 
        avatar {
          url
        }
      }
    }
  }`,
      { post: JSON.stringify([{ _id: _id }]) }
    )
  );

export const fullActionPost = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionInfoAboutUser(ID));
  await dispatch(actionPost(ID));
  console.log(ID);
};


export const actionMineAllPosts = (id) =>
  actionPromise(
    "actionAllPosts",
    gql(
      `query posts ($id:String){
    PostFind(query:$id) {
      _id
      text
      owner {
        _id
        
        nick
      }
      images {
        _id
        url
      } 
    }
  }`, 
      {
        id: JSON.stringify([
          { ___owner: id },
          { sort: [{ _id: -1 }], skip: [0], limit: [40] }
        ]),
      }
    )
  );

export const fullActionMinePosts = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionMineAllPosts(ID));
  console.log(ID);
};
export const actionAllPosts = (id) =>
  
  actionPromise(
    "actionAllPosts",
    gql(
      `query posts ($id:String){
    PostFind(query:$id) {
      _id
      text
      owner {
        _id
        
        nick
      }
      images {
        _id
        url
      } 
    }
  }`,  
      {
        id: JSON.stringify([
          { ___owner: id },
          { sort: [{ _id:-1}], skip: [0], limit: [40] }
        ]),
      }
    )
  );

export const fullActionAllPosts = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionAllPosts(ID));
  console.log(ID);
};
export const actionChangeNickname = (nick, _id) => {
  actionPromise(
    "actionChangeNick",
    gql(
      `mutation changeNickk($user:UserInput){
    UserUpsert(user: $user){
        nick 
    }
  }`,
      { user: { nick: nick, _id: _id } }
    )
  );
};
export const actionFullChangeNick =(nick, _id) => async (dispatch) => {
  console.log(nick);
  const t = await dispatch(actionChangeNickname(nick, _id));
  console.log(t); 
  if (t) {
    await dispatch(actionChangeNick(nick, _id));
    await dispatch(fullActionInfoAboutUser(_id));
  }
};
export const actionCreateComment = (_id) =>
  actionPromise(
    "actionCreateComment",
    gql(
      `mutation createComment ($comment:CommentInput){
    CommentUpsert(comment:$comment){
      _id 
      post {
        _id
        owner {
          _id
          nick 
        }
      }
      owner {
        _id
        nick 
      }
    }
  }`,
      { comment: { _id: _id } }
    )
  );


export const fullActionCreateComment = () => async (dispatch, getState) => {
  const ID = getState().auth?.payload?.sub?.id;
  await dispatch(actionPost(ID));
};

export const actionChangeAvatar = (url, _id) => {
  actionPromise(
    "actionChangeNick",
    gql(
      `mutation changeNickk($user:UserInput){
    UserUpsert(user: $user){
        avatar{
          url
        }
    }
  }`,
      { user: { avatar: url, _id: _id } }
    )
  );
};
export const actionFullChangeAvatar =(url, _id) => async (dispatch) => {
    console.log(url);
    const t = await dispatch(actionChangeAvatar(url, _id));
    console.log(t);
    if (t) {
      await dispatch(actionChangeAvatario(url, _id));
      await dispatch(fullActionInfoAboutUser(_id));
    }
  };
