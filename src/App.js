import React, {useMemo, useState} from "react";
import "./styles/App.css"
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "DIY", body: "Coolest description"},
        {id: 2, title: "Avengers", body: "Strange Description"},
        {id: 3, title: "Bazinga", body: "Great Description"}
    ]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo(() => {
        console.log('Sorted posts function worked');
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);

    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
    <div className="App">
        <MyButton onClick={() => setModal(true)}>
            Создать пользователя
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
        </MyModal>
        <hr style={{margin: '15px 0'}} />
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List 1" />
    </div>
    );
};

export default App;
