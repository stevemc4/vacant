import { ServerRoute } from '@hapi/hapi'
import Joi from '@hapi/joi'
import room from '../../controllers/Room'

const roomApi: ServerRoute[] = [
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
  }
]

export default roomApi
