import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../utilities/AuthProvider";

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
            const response = await fetch("http://127.0.0.1:3000/api/post", {
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
                const response = await fetch("http://127.0.0.1:3000/api/comment", {
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
            {
                post ? (
                    <>
                        <input placeholder="Your comment" onChange={handleCommentContentChange} value={commentContent}></input>
                        <button onClick={handleSubmit}>Post comment</button>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <h1>Comments</h1>
                        {
                            post.comments.map( (comment, index)  => 
                                <div key={index} style={{style: "1px solid black"}}>
                                    <p>{comment.author.username} ({comment.createdAt})</p>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <></>
                )
                
            }
        </>
    );
}

export default SinglePost;