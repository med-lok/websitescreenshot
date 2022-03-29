import "./App.css";
import Header from "./components/HeaderComponent";
import Main from "./components/MainComponent";
import Footer from "./components/FooterComponent";
import Contact from "./components/ContactComponent";
import About from "./components/AboutComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">

            <Contact />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
