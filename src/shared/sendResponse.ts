import type { Response } from 'express';

type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type TJsonData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: TMeta | null | undefined;
  data: T | null | undefined;
};

const sendResponse = <T>(res: Response, jsonData: TJsonData<T>) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined,
  });
};

export default sendResponse;
