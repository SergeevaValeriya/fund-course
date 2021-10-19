import React, { useEffect, useState } from "react";
import { usePosts } from "./hooks/usePosts";
import {useFetching} from "./hooks/useFetching";
import "./styles/App.css"
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import {getPageCount, getPagesArray} from "./utils/pages";


function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalCount, setTotalCount] = useState(0);
    const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    let pagesArray = getPagesArray(totalPages);

    useEffect(() => {
        fetchPosts(limit, page)
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
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
        {postError &&
        <h1>An error has occurred: ${postError}</h1>
        }
        {isPostsLoading
            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
            : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title="Posts List" />
        }
        <div className="page__wrapper">
        {pagesArray.map(p =>
            <span
                onClick={() => changePage(p)}
                key={p}
                className={page === p ? 'page page__current' : 'page'}>
                {p}
            </span>
        )}
        </div>
    </div>
    );
};

export default App;
