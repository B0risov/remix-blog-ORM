const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function seed() {
    const posts = getPosts();
    
    await Promise.all(
        posts.map(async post => {
            const createdPost = await db.post.create({ data: post });
            console.log('Created post:', createdPost);
        })
    );
    
    console.log('Seeding completed.');
}

seed()

function getPosts() {
    return [
        {
          title: 'JavaScript Event Loop Demystified',
          body: `A deep dive into the event loop mechanism in JavaScript, explaining how asynchronous operations are managed in the browser and Node.js.`,
        },
        {
          title: 'Mastering Async Await in JavaScript',
          body: `A concise guide to utilizing arrow functions for more compact and readable code in JavaScript.`,
        },
        {
          title: 'Simplify with Arrow Functions in JS',
          body: `An overview of applying ES6 destructuring for efficiently extracting values from objects and arrays.`,
        },
        {
          title: 'Unlocking ES6 Destructuring Powers',
          body: `In this article we will look at some of the new features offered in version 8 of PHP`,
        },
      ]
}