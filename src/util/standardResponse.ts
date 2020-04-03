interface ResponseParam {
  status?: number;
  message?: string;
  data?: unknown;
}

interface Response {
  statusCode: number;
  error: null;
  message: string;
  data?: unknown;
}

function standardResponse (data: ResponseParam): Response {
  return {
    statusCode: data.status || 200,
    error: null,
    message: data.message || '',
    data: data.data
  }
}

export default standardResponse
