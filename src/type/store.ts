type bannerKey = 'id' | 'midImg' | 'bigImg' | 'title' | 'description'
type meaageKey = 'id' | 'nickname' | 'content' | 'createDate' | 'avatar'

export type bannerItem = {
  [key in bannerKey]: string
}
export type messageItem = {
  [key in meaageKey]: string
}

export type aboutData = string

export type bannerData = Array<bannerItem>

export interface blogData {
  data: string
}

export type messageData = Array<messageItem>

export interface projectData {
  data: string
}

export interface settingData {
  data: string
}