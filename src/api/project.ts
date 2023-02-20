import type { project } from "@/type/project";
import request from "./request"

export async function getProject():Promise<project>{
    return await request.get("/api/project");
}