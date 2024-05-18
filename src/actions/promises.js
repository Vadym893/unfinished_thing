export const actionPending = (name) => ({
    type: "PROMISE",
    status: "PENDING",
    name,
});
export const actionFulfilled = (name, payload) => ({
    type: "PROMISE",
    status: "FULFILLED",
    name,
    payload,
});
export const actionRejected = (name, error) => ({
    type: "PROMISE",
    status: "REJECTED",
    name,
    error,
});
export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });
export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });
export const actionInfoAboutUserPromise = (data) => ({
    type: "INFO_ABOUT_USER",
    data,
});
export const actionCreatePost = (image, description) => ({
    type: "CREATE_POST",
    image,
    description,
});
export const actionPost = (data) => ({ 
    type: "ONE_POST", 
    data 
});
export const actionAllPosts = (data, count) => ({
    type: "ALL_POSTS",
    data,
    count,
});

export const actionChangeNick = (nick, id) => ({
    type: "NICK_CHANGE",
    nick,
    id,
});
export const actionChangeAvatario = (url, id) => ({
    type: "AVATAR_CHANGE",
    url,
    id,
});
