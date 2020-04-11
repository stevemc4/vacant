import { ServerRoute, HandlerDecorations } from '@hapi/hapi'

import room from './room'
import roomType from './type'
import user from './user'

const api: ServerRoute[] = [
  {
    path: '',
    method: 'GET',
    handler: (): HandlerDecorations => {
      return 'hello world'
    }
  },
  ...room,
  ...roomType,
  ...user
]

export default api.map(item => {
  const path = `/api${item.path}`
  return {
    ...item,
    path
  }
})
