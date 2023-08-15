import { Link } from "@remix-run/react";

export default function Auth() {

  return (
    <div className="auth-container">
      <h1>Admin Login</h1>
      <form method="POST">
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <Link to='/admin' className='btn btn-login'>
          Login
      </Link>
      </form>
    </div>
  );
}