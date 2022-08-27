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
    </div>
  )
}
