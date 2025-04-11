import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation:(Rule)=>Rule.required(),
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) =>Rule.min(1).max(50),
    }),
    defineField({
      name: 'content',
      type: 'markdown',
   
    }),
    
   
  ],
 
})
