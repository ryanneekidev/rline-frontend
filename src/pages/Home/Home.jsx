import { useState, useEffect } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar"
import Card from "../../components/Card/Card"

function Home() {
    const auth = useAuth();

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const privateFetch = async () => {
        try {
            const response = await fetch(`https://api.rline.ryanneeki.xyz/private`, {
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
        const response = await fetch(`https://api.rline.ryanneeki.xyz/posts`, {
            method: 'GET',
        })
        const res = await response.json();
        setPosts(res)
        console.log(res)
    }

    const likePost = async (postId) => {
        if (auth.token !== '') {
            const response = await fetch("https://api.rline.ryanneeki.xyz/posts/like", {
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
            const response = await fetch("https://api.rline.ryanneeki.xyz/posts/dislike", {
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

    const navigateToPost = (postId) => {
        navigate(`/posts?postId=${postId}`)
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
                    <div className="posts-area">
                        {/* <button onClick={logUser}>Log User</button> */}
                        {
                            auth.token ? (
                                <h1 className="welcome-header">Welcome back, {auth.user.username}</h1>
                            ) : (
                                <h1 className="welcome-header">Currenly browsing as a guest. Please sign in to like and post comments.</h1>
                            )
                        }
                        <h1 className="latest-posts">Latest posts</h1>
                        {
                            posts.map((post, index) =>
                                auth.token ? (
                                    auth.user.like.some(like => like.postId === post.id) ? (
                                        <Card key={index} postTitle={post.title} postContent={post.content} postAuthor={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Liked" likeCount={post.likes} commentCount={post.comments.length} commentAction={() => navigateToPost(post.id)} likeAction={() => dislikePost(post.id, auth.user.like.find((like) => like.postId === post.id).id)} />
                                    ) : (
                                        <Card key={index} postTitle={post.title} postContent={post.content} postAuthor={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Like" likeCount={post.likes} commentCount={post.comments.length} commentAction={() => navigateToPost(post.id)} likeAction={() => likePost(post.id)} />
                                    )
                                ) : (
                                    <Card key={index} postTitle={post.title} postContent={post.content} postAuthor={post.author.username} createdAt={post.createdAt} postStatus={post.postStatus} commentText="Comment" likeText="Like" likeCount={post.likes} commentCount={post.comments.length} commentAction={() => navigateToPost(post.id)} likeAction={() => likePost(post.id)} />
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;