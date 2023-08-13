

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
        <button className="btn btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}