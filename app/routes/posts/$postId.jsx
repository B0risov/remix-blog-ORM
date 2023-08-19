import { useLoaderData, Link } from '@remix-run/react'
import { redirect } from 'react-router'
import { db } from '~/utils/db.server'
import isAuthenticated from '../auth'

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId }
  })

  if (!post) throw new Error('Post not found')

  const data = { post }
  return data
}

export const action = async ({ request, params }) => {
  const form = await request.formData()
  const method = form.get('_method');

  if (method === 'put') {
    const updatedPost = {
      title: form.get('title'),
      body: form.get('body')
    }

    await db.post.update({
      where: { id: params.postId },
      data: updatedPost
    })
    return redirect(`/posts/${params.postId}`);
  } else if (method === 'delete') {
    const post = await db.post.findUnique({
      where: { id: params.postId },
    })

    if (!post) throw new Error('Post not found')

    await db.post.delete({ where: { id: params.postId } })
    return redirect('/posts')
  } else {
    return redirect(`/posts/${params.postId}`);
  }
}

function Post() {
  const { post } = useLoaderData()

  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to='/posts' className='btn btn-revers'>
          Back
        </Link>
      </div>

      <div className="page-content">{post.body}</div>

      <div className="page-content">
      {isAuthenticated && <form method='POST'>
          <input type="hidden" name="_method" value="put" />
          <div className="form-control">
            <label htmlFor='title'>Correct title</label>
            <input type="text" name="title" value={post.title} />
          </div>
          <div className="form-control">
            <label htmlFor='body'>Correct body</label>
            <input type="text" name="body" value={post.body} />
          </div>
          <button className="btn btn-block" type="submit">Save</button>
        </form>}
        <div className="page-footer">
        <form method='POST'>
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete" type="submit">Delete</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Post
