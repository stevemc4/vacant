import { ServerRoute } from '@hapi/hapi'
import Joi from '@hapi/joi'
import user from '../../controllers/User'

const userApi: ServerRoute[] = [
  {
    path: '/user',
    method: 'PUT',
    handler: user.create,
    options: {
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
          role: Joi.string().allow().required()
        }
      }
    }
  },
  {
    path: '/user',
    method: 'GET',
    handler: user.list
  },
  {
    path: '/user/{id}',
    method: 'GET',
    handler: user.list,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    path: '/user/{id}',
    method: 'POST',
    handler: user.edit,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        },
        payload: {
          name: Joi.string().required(),
          username: Joi.string().required(),
          role: Joi.string().required(),
          enabled: Joi.boolean().required()
        }
      }
    }
  },
  {
    path: '/user/{id}',
    method: 'DELETE',
    handler: user.del,
    options: {
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  }
]

export default userApi
