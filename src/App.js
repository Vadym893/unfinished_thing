import "./App.css";
import { Router } from "react-router-dom";
import { store } from "./actions/reducers";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { AllRoutes } from "./actions/routes";
export const history=createHistory();
function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
          <AllRoutes />
      </Provider>
    </Router>
  );
}


export default App;

