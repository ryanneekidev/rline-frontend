import { useAuth } from "../../utilities/AuthProvider";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Create() {
    const auth = useAuth();

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        postStatus: 'NORMAL'
    });

    const handleTitleChange = (e) => {
        let title = e.target.value;
        setPost((prev) => ({ ...prev, title }))
    }

    const handleContentChange = (e) => {
        let content = e.target.value;
        setPost((prev) => ({ ...prev, content }))
    }

    const handlePostStatusChange = (e) => {
        let postStatusBool = e.target.checked;
        let postStatus = "NORMAL";
        if (postStatusBool === true) {
            postStatus = "ADMIN"
        } else {
            postStatus = "NORMAL"
        }
        setPost((prev) => ({ ...prev, postStatus }))
    }

    const createPost = async () => {
        if (post.title !== "" && post.content !== "") {
            const response = await fetch('https://api.rline.ryanneeki.xyz/posts', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `title=${post.title}&content=${post.content}&authorId=${auth.user.id}&postStatus=${post.postStatus}`
            })
            const res = await response.json();
            console.log(res.message)
            navigate('/');
            return;
        }
        alert("Please fill out all required fields!")
    }

    return (
        <>
            <div className="create-container">
                <Navbar />
                <div className="create-main-area">
                    <h1 className="create-new-title">Create a New Post</h1>
                    <h2 className="title">Title</h2>
                    <input placeholder="Title" className="create-title" onChange={handleTitleChange}></input>
                    <h2 className="content">Content</h2>
                    <textarea placeholder="Content" className="create-content" onChange={handleContentChange}></textarea>
                    <button className="create-post-button" onClick={createPost}>Post</button>
                </div>
            </div>
        </>
    );
}

export default Create;