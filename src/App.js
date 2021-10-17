import React, { useState } from "react";
import "./styles/App.css"
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "JS", body: "Description"},
        {id: 2, title: "JS 2", body: "Description"},
        {id: 3, title: "JS 3", body: "Description"}
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    return (
    <div className="App">
        <PostForm create={createPost} />
        <PostsList posts={posts} title="Posts List 1" />

    </div>
    );
};

export default App;
