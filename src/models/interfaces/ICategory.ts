import {Document} from 'mongoose'

export interface ICategory extends Document{
  name:string
  notesId:Array<string>
  authorId:string
  createdAt:string
  updatedAt?:string
}