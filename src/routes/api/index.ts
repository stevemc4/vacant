import { ServerRoute, HandlerDecorations } from '@hapi/hapi'

const api: ServerRoute[] = [
  {
    path: '',
    method: 'GET',
    handler: (): HandlerDecorations => {
      return 'hello world'
    }
  }
]

export default api.map(item => {
  const path = `/api${item.path}`
  return {
    ...item,
    path
  }
})
