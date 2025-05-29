import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import { Heart, MessageSquare, Check } from 'react-feather'

function Card(props) {
    return (
        <>
            <div className="card">
                <div className="card-metadata-section">
                    <p className="card-post-author">{props.postAuthor}</p>
                    <p className="card-post-date">{dayjs(props.createdAt).from(dayjs())}</p>
                </div>
                <div className="card-title-section">
                    <p className="card-post-title">{props.postTitle}</p>
                </div>
                <div className="card-content-section">
                    <p className="card-content">{props.postContent}</p>
                </div>
                <div className="card-interaction-section">
                    <button className="card-comment-button" onClick={props.commentAction}><MessageSquare className="comment-icon" size="20"/> {props.commentText} {props.commentCount}</button>
                    <button className="card-like-button" onClick={props.likeAction}><Heart className="like-icon" size="20"/> {props.likeText} {props.likeCount}</button>
                </div>
            </div>
        </>
    );
}

export default Card;