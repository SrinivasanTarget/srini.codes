import Greeting from '../components/greeting/Greeting'
import { blogs } from '../portfolio/blogs'
import BlogCard from '../components/blogcard/BlogCard'

export default function BlogScreen() {
  return (
    <div className='relative mx-10vw pb-16'>
      <Greeting
        url={new URL('../assets/images/blog.webp', import.meta.url).href}
        isName={false}
        description={'I love sharing my knowledge as blogs to wider community 🚀'}
        subdescription={'Learn about mobile testing, contract testing, and more'}
        showLogo={false}
        isSocial={true}
      />
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0'>
          <h1 className='text-indigo-100 text-5xl decoration-4 p-4'>
            <span className='inline-flex'>Blogs</span>
          </h1>
        </div>
      </div>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl p-3'>
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={{ source: blog.source, title: blog.title }} />
        ))}
      </div>
      <div className='relative flex h-full w-full items-center justify-center whitespace-nowrap text-inverse space-x-3 px-8 py-4'>
        <div className='text-white block px-3 py-2 rounded-md text-base font-inter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          <a className='inline-flex ' href='https://blog.srini.codes/'>
            check here for more blogs
          </a>
        </div>
      </div>
    </div>
  )
}
