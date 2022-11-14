import { myAxios } from "./helper";

export const loadAllCategories=()=>{
    return myAxios.get("api/category/all").then(response => response.data)
}