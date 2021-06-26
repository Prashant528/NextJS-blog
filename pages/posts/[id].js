import Head from 'next/head'
import MyDate from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }

export default function Post({postData}) {
  return <Layout>
    <Head>
        <title>{postData.title}</title>
      </Head>

    <article>
    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
    <br />
    <div className={utilStyles.lightText}>
          <MyDate dateString={postData.date} />
        </div>

      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
    
  </Layout>
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }