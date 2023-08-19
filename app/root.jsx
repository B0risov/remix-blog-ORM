import { Outlet, LiveReload, Link, Links, Meta } from "@remix-run/react";
import globalStylesUrl from '~/styles/global.css';
import auth from './styles/auth'
import btn from './styles/btn'
import form from './styles/form'
import navbar from './styles/navbar'
import page from './styles/page'
import posts from './styles/posts'

export const links = () => [
  {rel: 'stylesheet', href: globalStylesUrl},
  {rel: 'stylesheet', href: auth},
  {rel: 'stylesheet', href: btn},
  {rel: 'stylesheet', href: form},
  {rel: 'stylesheet', href: navbar},
  {rel: 'stylesheet', href: page},
  {rel: 'stylesheet', href: posts}
];

export const meta = () => {

  const description = 'A new remix app with ORM'
  const keywords = 'remix, react, ORM'

  return {
    description,
    keywords,
  }
}

export default function App() {
  return ( 
      <Documnet>
        <Layout>
          <Outlet  />
        </Layout>
      </Documnet>
    )
}

function Documnet({ children, title}) {
  return (
    <html lang="en">
    <head>
      <Meta />
      <Links />
      <title>{ title ? title : 'My remix blog'}</title>
    </head>
    <body>
      {children}
      {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
    </body>
  </html>
  )
}

function Layout({children}) {
  return (
    <>
     <nav className="navbar">
       <Link to='/' className='logo'>
         Remix
       </Link>
       <ul className="nav">
         <li>
           <Link to='/posts'>Posts</Link>
         </li>
       </ul>
     </nav>

     <div className="container">
       {children}
     </div>
    </> 
  )
}

export function ErrorBoundary({error}) {
  console.log(error)
  return(
    <Documnet>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Documnet>
  )
}