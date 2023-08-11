import { defineDocumentType, makeSource } from 'contentlayer/source-files'

import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import rehypePrettyCodeOptions from "./src/lib/RehypePrettyCode"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
    slug:
    {
        type: "string",
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams:
    {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
}

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: "blog/**/*.mdx",
    fields:
    {
        published:
        {
            type: "boolean",
            default: true,
        },
        title:
        {
            type: "string",
            required: true
        },
        description:
        {
            type: "string",
            required: true
        },
        date:
        {
            type: "date",
            required: true
        },
    },
    computedFields,
    contentType: "mdx"
}))

export default makeSource({
    contentDirPath: "content",
    documentTypes: [Post],
    mdx: 
    {
        remarkPlugins: [remarkGfm],
        rehypePlugins: 
        [
            rehypeSlug,
            [rehypePrettyCode, rehypePrettyCodeOptions],
            [
                rehypeAutolinkHeadings,
                {
                    properties: 
                    {
                        className: ["anchor"]
                    },
                },
            ],
        ],
    },
})