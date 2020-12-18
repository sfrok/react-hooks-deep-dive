// Core
import { parse } from "query-string";

export const limit = 10;

export const getPaginator = (search) => {
  const parsedSearchParam = parse(search);
  const currentPage = parsedSearchParam.page
    ? Number(parsedSearchParam.page)
    : 1;
  const offset = currentPage * limit - limit;

  return { currentPage, offset };
};
