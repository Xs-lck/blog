import type { blogs, blogTypes, blogArticle, comments, postCommentParams, commentRows } from '@/type/blog';
import request from './request'

//获取博客列表数据
export async function getBlogs(page = 1, limit = 10, categoryid = -1):Promise<blogs> {
    return await request.get('/api/blog', {
        params: {
            page,
            limit,
            categoryid
        }
    });
}

//获取博客分类
export async function getBlogTypes():Promise<blogTypes> {
    return await request.get('/api/blogtype')
}

//获取单个博客
export async function getBlog(id:string):Promise<blogArticle> {
    return await request.get(`/api/blog/${id}`)
}

//提交评论
export async function postComment(commentInfo:postCommentParams):Promise<commentRows> {
    return await request.post('/api/comment', commentInfo)
}

//获取单篇博客所有评论
export async function getComments(blogid:string, page = 1, limit = 10):Promise<comments> {
    return await request({
        url: '/api/comment',
        method: 'get',
        params: {
            blogid,
            page,
            limit
        }
    })
}