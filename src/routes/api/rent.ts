import { ServerRoute } from '@hapi/hapi'
import Joi from '@hapi/joi'
import rent from '../../controllers/Rent'

const rentApi: ServerRoute[] = [
  {
    path: '/rent',
    method: 'PUT',
    handler: rent.create,
    options: {
      validate: {
        payload: {
          room: Joi.number().required(),
          guestId: Joi.string().required(),
          guestName: Joi.string().required(),
          rentDuration: Joi.number().required()
        }
      }
    }
  }
]

export default rentApi
