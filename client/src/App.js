import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
function App() {

  const currentUser = useSelector(store => store.user);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/about" element={<About />}></Route>
          {currentUser ? <Route path="/profile" element={<Profile />}></Route> : <Route path="/profile" element={<SignIn />}></Route>}
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
