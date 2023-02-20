import request from "./request"

export async function getAbout():Promise<string>{
    return await request.get("/api/about");
}