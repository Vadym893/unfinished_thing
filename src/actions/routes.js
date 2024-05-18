import { BrowserRouter as Router, Route } from "react-router-dom";
import {CRegistration} from "../actions/registration"
import { CLogin } from "../actions/login";
import {  CMainPage } from "../actions/mainPage";
import { CMyInfo } from "../pages/myinfo";
import { CCreatePost } from "./createPost";
import { CNickChange } from "./nickChange";
import { CPost } from "./post";
import { CComments } from "./comment";

export const AllRoutes = () => {
  return (
    <Router>
      <Route path="/" exact component={CRegistration} />
      <Route path="/registration"  component={CRegistration} />
      <Route path="/pagecreatepost" component={CCreatePost} />
      <Route path="/login"  component={CLogin} />
      <Route path="/createpost" component={CCreatePost} />
      <Route path="/main"  component={CMainPage} />
      <Route path="/myinfo"  component={CMyInfo} />
      <Route path="/settings"  component={CNickChange} />
      <Route path="/comment" component={CComments}></Route>
      <Route path="/post" component={CPost}></Route>
    </Router>
  );
};