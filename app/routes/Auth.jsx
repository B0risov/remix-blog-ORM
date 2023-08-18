import { Link } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { redirect } from 'react-router'
import bcrypt from 'bcrypt'

export const action = async ({request}) => {
  console.log('hi')
  const form = await request.formData()
  const username = form.get('username')
  const password = form.get('password')

  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return {
      status: 401,
      body: JSON.stringify({
        error: 'Wrong username or password',
      }),
    };
  } else {
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return {
        status: 401,
        body: JSON.stringify({
          error: 'Wrong username or password',
        }),
      };
    } else {
      return redirect('/admin');
    }
  }
};

function Auth() {
  return (
    <>
    <div className="page-header">
      <h1>Login</h1>
      <Link to='/' className='btn btn-reverse'>
        Back
      </Link>
    </div>

    <div className="page-content">
      <form method='POST'>
        <div className="form-control">
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' />
        </div>
        <div className="form-control">
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <button type='submit' className="btn btn-block">
          Login
        </button>
      </form>
    </div>
    </>
  )
}

export default Auth