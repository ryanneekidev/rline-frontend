import { useAuth } from "../../utilities/AuthProvider" ;
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch('http://backend-test-production-2c47.up.railway.app/api/posts', {
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
            <input placeholder="Title" onChange={handleTitleChange}></input>
            <input placeholder="Content" onChange={handleContentChange}></input>
            <input type="checkbox" onChange={handlePostStatusChange}></input>
            <button onClick={createPost}>Post</button>
        </>
    );
}

export default Create;