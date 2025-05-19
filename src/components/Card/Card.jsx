function Card(props) {
    return (
        <>
            <div className="card">
                <div className="card-title-section">
                    <p className="card-post-title">{props.postTitle}</p>
                    <p className="card-post-author">{props.postAuthor}</p>
                    <p className="card-post-date">{props.postDate}</p>
                </div>
                <div className="card-content-section">
                    <p className="card-content">{props.postContent}</p>
                </div>
                <div className="card-interaction-section">
                    <button className="card-like-button" onClick={props.likeAction}>{props.likeText} {props.likeCount}</button>
                    <button className="card-like-button" onClick={props.commentAction}>{props.commentText} {props.commentCount}</button>
                </div>
            </div>
        </>
    );
}

export default Card;