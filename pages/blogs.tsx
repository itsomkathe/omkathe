import type { NextPage } from "next";
import Head from "next/head";
import BlogsPage from "@components/Blogs/Blogs";

const Blogs: NextPage<BlogProps> = ({ blogList }) => {
    return (
        <div>
            <Head>
                <title>omkathe | blogs</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta property="og:title" content="Hello There! | Om Kathe"></meta>
                <meta name="description" content="Software Engineer from India! I speak JavaScript, TypeScript, and Java!"/>
                <meta name="og:description" content="Software Engineer from India! I speak JavaScript, TypeScript, and Java!"/>
                <meta name="apple-mobile-web-app-title" content="Om Kathe's Blog"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✍️</text></svg>"/>
            </Head>
            <BlogsPage blogList={blogList}/>
        </div>
    );
};

export default Blogs;

export async function getStaticProps() {
    let blogList: IBlog[] = [];
    const response = await fetch('https://dev.to/api/articles?username=itsomkathe');
    const data = await response.json();
    const list: IBlog[] =  data.map((blog: any) => {
        let { title, description, published_at, reading_time_minutes, tag_list, url }: IBlog = blog;
        const dateString = new Date(published_at).toDateString().slice(4);
        const blogObj: IBlog = { title, description, published_at: dateString, reading_time_minutes, tag_list, url };
        return blogObj;
    });
    blogList = list;
    

    return {
      props: {
        blogList
      },
    }
}
