import { ServerRoute, HandlerDecorations } from '@hapi/hapi'
import room from '../../controllers/Room'
import roomType from '../../controllers/RoomType'
import Joi from '@hapi/joi'

const api: ServerRoute[] = [
  {
    path: '',
    method: 'GET',
    handler: (): HandlerDecorations => {
      return 'hello world'
    }
  },
  {
    path: '/room',
    method: 'PUT',
    handler: room.create,
    options: {
      validate: {
        payload: {
          name: Joi.string().required(),
          type: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/room',
    method: 'GET',
    handler: room.list
  },
  {
    path: '/room/{id}',
    method: 'GET',
    handler: room.list,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/room/{id}',
    method: 'POST',
    handler: room.edit,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        },
        payload: {
          name: Joi.string().required(),
          enabled: Joi.boolean().required(),
          type: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/room/{id}',
    method: 'DELETE',
    handler: room.del,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/type',
    method: 'PUT',
    handler: roomType.create,
    options: {
      validate: {
        payload: {
          name: Joi.string().required(),
          rate: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/type',
    method: 'GET',
    handler: roomType.list
  },
  {
    path: '/type/{id}',
    method: 'GET',
    handler: roomType.list,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/type/{id}',
    method: 'POST',
    handler: roomType.edit,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        },
        payload: {
          name: Joi.string().required(),
          rate: Joi.number().required(),
          enabled: Joi.boolean().required()
        }
      }
    }
  },
  {
    path: '/type/{id}',
    method: 'DELETE',
    handler: roomType.del,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
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
