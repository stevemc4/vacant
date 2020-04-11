import { ServerRoute } from '@hapi/hapi'
import Joi from '@hapi/joi'
import roomType from '../../controllers/RoomType'

const roomTypeApi: ServerRoute[] = [
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

export default roomTypeApi
