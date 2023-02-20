import type { bannerData } from '@/type/store';
import request from './request'
export async function getBanner():Promise<bannerData>{
    return await request.get("/api/banner");
}
// getBanner().then(resp => console.log(resp))