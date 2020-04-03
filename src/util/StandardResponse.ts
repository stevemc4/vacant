interface ResponseParam {
  status?: number;
  message?: string;
  data?: unknown;
}

interface Response {
  status: number;
  error: null;
  message: string;
  data?: unknown;
}

function StandardResponse (data: ResponseParam): Response {
  return {
    status: data.status || 200,
    error: null,
    message: data.message || '',
    data: data.data
  }
}

export default StandardResponse
