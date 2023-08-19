import { Link } from '@remix-run/react'
import { db } from '~/utils/db.server'
import { redirect } from 'react-router'
import bcrypt from 'bcrypt'

let isAuthenticated = false;

export const action = async ({request}) => {
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
      isAuthenticated = true;
      return {
        status: 200,
        body: JSON.stringify({
          success: true,
          isAuthenticated: true,
        }),
      };
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
    {isAuthenticated && <h2>Authorized</h2>}
      {!isAuthenticated && <h2>Unauthorized</h2>}
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
      <div className="page-footer">
      {isAuthenticated && <Link to='/admin' className='btn'>
         to Admin
        </Link>}
      </div>
    </div>
    </>
  )
}

export default Auth