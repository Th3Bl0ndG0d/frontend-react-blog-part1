import posts from '/src/constants/data.json';
import { Link } from 'react-router-dom';
import './AllPosts.css';

function AllPosts() {
    return (
        <div className="outer-container all-posts-wrapper">
            <div className="inner-container all-posts-card">
                <h1>Bekijk alle {posts.length} posts op het platform</h1>
                <ul className="post-list">
                    {posts.map(post => (
                        <li key={post.id} className="post-card">
                            <p>
                                <Link to={`/posts/${post.id}`} className="link post-title">
                                    {post.title}
                                </Link>{' '}
                                <span className="post-author">({post.author})</span>
                            </p>
                            <p className="meta">
                                {post.comments} reacties - {post.shares} keer gedeeld
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AllPosts;
