import { useLoaderData, Link } from '@remix-run/react'
import { redirect } from 'react-router'
import {db} from '~/utils/db.server'

export const loader = async ({params}) => {
  const post = await db.post.findUnique({
    where: { id: params.postId }
  })

  if(!post) throw new Error('Post not found')

  const data = {post}
  return data
}

export const action = async ({request, params}) => {
  const form = await request.formData()
  if (form.get('_method') === 'put') {
    const post = await db.post.findUnique({
      where: { id: params.postId },
    })
  
    if(!post) throw new Error('Post not found')

    const updatedPost = {
      title: form.get('title'),
      body: form.get('body')
    }

    await db.post.update({
      where: { id: params.postId },
      data: updatedPost
    })
    return redirect('/posts')
  }
}

function Post() {
  const {post} = useLoaderData()

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
         <form method='POST'>
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
         </form>
      </div>
    </div>
  )
}

export default Post
