import { defineQuery } from 'next-sanity'

export const getAllPostsQuery = defineQuery(`*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  image,
  views,
  category,
  content,
    _createdAt,
  author->{
    _id,
    name,
    image,
    bio
  }
} | order(_createdAt desc)`)
export const getPostbyIdQuery = defineQuery(`*[_type == "post" && _id == $id][0]{
    _id,
    title,
    "slug": slug.current,
    image,
    views,
    category,
    content,
        _createdAt,
    author->{
        _id,
        name,
        image,
        bio
    }
    }`)