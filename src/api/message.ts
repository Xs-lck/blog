import type { comments, formData } from '@/type/blog'
import request from './request'

//提交留言
export async function postMessage(commentInfo:formData){
    return await request.post('/api/message', commentInfo)
}
 
//获取所有留言
export async function getMessages(page = 1, limit = 10):Promise<comments>{
    return await request.get('/api/message', {
        params: {
            page,
            limit
        }
    })
}