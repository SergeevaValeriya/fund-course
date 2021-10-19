import React, { useEffect, useState } from "react";
import { usePosts } from "./hooks/usePosts";
import "./styles/App.css"
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";

function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    useEffect(() => {
        fetchPosts()
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    async function fetchPosts() {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll();
            setPosts(posts);
            setIsPostsLoading(false);
        }, 1000)

    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
    <div className="App">
        <MyButton onClick={() => setModal(true)}>
            Create Post
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
        </MyModal>
        <hr style={{margin: '15px 0'}} />
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List" />
        }
    </div>
    );
};

export default App;
