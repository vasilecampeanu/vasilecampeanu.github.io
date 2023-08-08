import Link from "next/link";

import { FC } from "react";

import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

interface RecentlyPublishedProps {
}

const RecentlyPublished: FC<RecentlyPublishedProps> = ({ }) => {
    const posts = allPosts.filter((post: any) => post.published).sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })

    return (
        <section className="recently-published">
            <h1 className="section-title">Recently Published</h1>
            <div className="post-list">
                {posts.map((post, index) => (
                    <Link 
                        key={post._id}
                        href={post.slug} 
                        className="post-preview" 
                    >
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <span className="read-more">Read more</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default RecentlyPublished;
