import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import MyDate from '../components/date'
import { getSortedPostsData } from '../lib/post'

export async function getStaticProps() {

    // testing fetching data from the apis within next itself.
    const res = await fetch(`http://localhost:3000/api/hello`)
    const data = await res.json()

  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
      data
    }
  }
}


export default function Home({ allPostsData , data}) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello I am a self-learning Next developer from Kathmandu, Nepal.</p>
        <p>This is the data I've fetched from its own API:</p>
        <p>Text:{data.name} {''} Color:{ data.color}</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>          
              <br />
              <small className={utilStyles.lightText}>
                  <MyDate dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
