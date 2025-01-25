import { http } from "@/utils/http";

/*获取文章列表*/
export const getEssayList = (params: any) => {
  return http.request<any>("get", "/articles", { params });
};

/*删除文章*/

/*新增文章*/

/*编辑文章*/

/*创建文章*/
