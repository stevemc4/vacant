import { ServerRoute, HandlerDecorations } from '@hapi/hapi'

import room from './room'
import roomType from './type'
import user from './user'
import rent from './rent'

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
  ...user,
  ...rent
]

export default api.map(item => {
  const path = `/api${item.path}`
  return {
    ...item,
    path
  }
})
