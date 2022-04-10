import {Document} from 'mongoose'

export interface INote extends Document{
  title:string
  body:string
  authorId:string
  categoryId?:string
  createdAt:string
  updatedAt?:string
}