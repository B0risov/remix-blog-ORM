import React, { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    console.log('gooo')
    e.preventDefault();

    const client = new PrismaClient();

    const user = await client.user.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      console.log('Wrong username or password');
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('Wrong username or password');
      return;
    }

    console.log('Good job');
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Auth;