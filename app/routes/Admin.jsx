import { Outlet, Link, useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';

export const loader = async () => {
    const posts = await db.post.findMany({
      select: { id: true, title: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  
    return { posts };
  };
  

  function Admin() {
    const { posts } = useLoaderData();
  
    return (
      <div>
        <div className="page-header">
        <h1>Admin Panel</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
        </div>
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
                {new Date(post.createdAt).toLocaleString()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Admin;
  