import './App.css'
import Navigation from "./components/navigation/Navigation.jsx";
import NewPost from "./pages/newpost/NewPost.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AllPosts from "./pages/allposts/AllPosts.jsx";
import BlogPost from "./pages/post/BlogPost.jsx";
import Footer from "./components/footer/Footer.jsx";


function App() {
    return (
        <>
            <div className="page-container">
                <Navigation/>
                <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/NewPost" element={<NewPost/>}/>
                <Route path="/AllPosts" element={<AllPosts/>}/>
{/*Opdracht 1.3 Dynamic routing.....*/}
                    <Route path="/posts/:id" element={<BlogPost />} />

                {/*<NotFound/>*/}
                {/*<AllPosts/>*/}
                {/*<Post/>*/}
                </Routes>
                <Footer />
            </div>

        </>

    )
}

export default App
