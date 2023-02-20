export interface blogTypesItem {
  id: number,
  name: string,
  articleCount: number,
  order?: number
}

export type blogTypes = Array<blogTypesItem>

export interface listItem extends blogTypesItem {
  isSelected: boolean;
  aside: string;
}

interface blogsRow {
  id: string,
  title: string,
  description: string,
  category: {
    id: number,
    name: string,
  },
  scanNumber: number,
  commentNumber: number,
  thumb: string,
  createDate: string
}

export interface blogs {
  total: number,
  rows: Array<blogsRow>
}

export interface tocItem {
  name: string,
  anchor: string,
  children?: Array<tocItem>
}

export type Toc = Array<tocItem>

export interface newToc extends tocItem {
  isSelected: boolean,
  children?: Array<newToc>
}

export interface blogArticle extends blogsRow {
  htmlContent: string,
  toc: Toc
}

type comrow = 'id' | 'nickname' | 'content' | 'createDate' | 'avatar'
export type commentRows = {
  [keyof in comrow]: string
}

export interface comments {
  total: number,
  rows: Array<commentRows>
}

export interface formData {
  nickname: string;
  content: string;
}

export interface postCommentParams extends formData {
  blogId: string
}