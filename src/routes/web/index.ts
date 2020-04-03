import { ServerRoute, HandlerDecorations } from '@hapi/hapi'

const web: ServerRoute[] = [
  {
    path: '/',
    method: 'GET',
    handler: (): HandlerDecorations => {
      return 'hello world'
    }
  }
]

export default web
