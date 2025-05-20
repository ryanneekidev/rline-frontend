import { useState, useEffect } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar"
import Card from "../../components/Card/Card"

function Home () {
    const auth = useAuth();

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const privateFetch = async () => {
        try {
            const response = await fetch(`http://backend-test-production-2c47.up.railway.app/api/private`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            });
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log(err)
        }
    }

    const getPosts = async () => {
        const response = await fetch(`http://127.0.0.1:3000/api/posts`, {
            method: 'GET',
        })
        const res = await response.json();
        setPosts(res)
        console.log(res)
    }

    const likePost = async (postId) => {
        if (auth.token !== '') {
            const response = await fetch("http://127.0.0.1:3000/api/posts/like", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userId=${auth.user.id}&postId=${postId}`
            })
            const res = await response.json()
            auth.user.like = res.updatedLikes;
            console.log(res)
            getPosts()
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    const dislikePost = async (postId, likeId) => {
        if (auth.token !== '') {
            const response = await fetch("http://127.0.0.1:3000/api/posts/dislike", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `userId=${auth.user.id}&postId=${postId}&likeId=${likeId}`
            })
            const res = await response.json()
            auth.user.like = res.updatedLikes;
            console.log(res)
            getPosts()
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    const commentPost = (postId) => {
        if (auth.token !== '') {
            navigate(`/posts?postId=${postId}`)
        } else {
            navigate('/login')
        }
    }

    const logUser = () => {
        console.log(auth.token);
    }

    useEffect(() => { getPosts() }, [])

    return (
        <>
            <div className="home-container">
                <Navbar />
                <div className="home-main-area">
                    <button onClick={logUser}>Log User</button>
                    {
                        posts.map( (post, index) => 
                            auth.token ? (
                                auth.user.like.some(like => like.postId === post.id) ? (
                                    <Card key={index} text={"post is liked"} postTitle={post.title} postContent={post.content} postAuthor={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Liked" likeCount={post.likes} commentCount={post.comments.length} commentAction={() => commentPost(post.id)} likeAction={() => dislikePost(post.id, auth.user.like.find((like) => like.postId === post.id).id)} />
                                ) : (
                                    <Card key={index} text={"post is not liked"} postTitle={post.title} postContent={post.content} postAuthor={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Like" likeCount={post.likes} commentCount={post.comments.length} commentAction={() => commentPost(post.id)} likeAction={() => likePost(post.id)} />
                                )
                            ) : (
                                <Card key={index} postTitle={post.title} postContent={post.content} postAuthor={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Like" likeCount={post.likes} commentCount={post.comments.length} commentAction={() => commentPost(post.id)} likeAction={() => likePost(post.id)} />
                            )
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Home;