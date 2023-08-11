import { FC } from 'react'

import { Post, allPosts } from "contentlayer/generated"

import Layout from '../../../components/layout/Layout'
import RecentlyPublished from '../../../components/features/RecentlyPublished'
import MdxWrapper from '@/src/components/features/MdxWrapper'

interface PostPageProps {
    params: {
        slug: string[]
    }
}

const getPostFromParams = async (params: { slug: any[] }) => {
    const slug = params?.slug?.join("/")
    const post = allPosts.find((post) => post.slugAsParams === slug)

    if (!post) {
        return;
    }

    return post
}

const HomePage: FC<PostPageProps> = async ({ params }) => {
    const post: any = await getPostFromParams(params);

    return (
        <Layout post={post} className="post" hideSeparator={true}>
            <MdxWrapper code={post?.body.code} />
        </Layout>
    )
}

export default HomePage
