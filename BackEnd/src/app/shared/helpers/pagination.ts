import { Model } from "sequelize-typescript";
import { PaginatedResponse } from "../classes/paginated-response";

export const getFindOptions = (page?: number, size?: number): { limit: number, offset: number } => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return {limit, offset} 
}