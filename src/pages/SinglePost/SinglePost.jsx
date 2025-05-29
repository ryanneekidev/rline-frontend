import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../utilities/AuthProvider";
import Navbar from "../../components/Navbar/Navbar";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

function SinglePost() {
    const [post, setPost] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [commentContent, setCommentContent] = useState("");

    const auth = useAuth();

    const navigate = useNavigate();

    const handleCommentContentChange = (e) => {
        setCommentContent((prev) => setCommentContent(e.target.value))
    }

    const getPost = async (postId) => {
        try {
            const response = await fetch("https://api.ryanneeki.xyz/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `postId=${postId}`
            })
            const res = await response.json()
            if(res.post){
                setPost(res.post)
                return;
            }
            throw new Error(res.message)
        } catch (err) {
            console.error(err);
        }
    }

    const postComment = async () => {
        try {
            if (auth.token !== '') {
                const response = await fetch("https://api.ryanneeki.xyz/comment", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `userId=${auth.user.id}&postId=${post.id}&content=${commentContent}`
                })
                const res = await response.json()
                if(res){
                    console.log(res)
                    getPost(searchParams.get("postId"))
                    setCommentContent((prev) => "")
                    return;
                }
                throw new Error(res.message)
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = () => {
        if (post)  {
            postComment();
        }
    }

    useEffect(() => { getPost(searchParams.get("postId")) }, [])

    return (
        <>
            <div className="single-post-container">
                <Navbar />
                <div className="single-post-main-area">
                    {
                        post ? (
                            <>
                                <div className="post-container">
                                    <div className="card-metadata-section">
                                        <p className="card-post-author">{post.author.username}</p>
                                        <p className="card-post-date">{dayjs(post.createdAt).from(dayjs())}</p>
                                    </div>
                                    <div className="card-title-section">
                                        <p className="card-post-title">{post.title}</p>
                                    </div>
                                    <div className="card-content-section">
                                        <p className="card-content">{post.content}</p>
                                    </div>
                                </div>
                                <div className="post-input-container">
                                    <input className="comment-input-field" placeholder="Your comment" onChange={handleCommentContentChange} value={commentContent}></input>
                                    <button className="submit-comment-button" onClick={handleSubmit}>Post</button>
                                </div>
                                <h1 className="comments-title">Comments</h1>
                                {
                                    post.comments.map( (comment, index)  => 
                                        <div key={index} className="post-container">
                                            <div className="card-metadata-section">
                                                <p className="card-post-author">{comment.author.username}</p>
                                                <p className="card-post-date">{dayjs(post.createdAt).from(dayjs())}</p>
                                            </div>
                                            <div className="card-content-section">
                                                <p className="card-content">{comment.content}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default SinglePost;