import { Request, HandlerDecorations } from '@hapi/hapi'
import boom from '@hapi/boom'
import Room from '../models/Room'
import Guest from '../models/Guest'
import Rent from '../models/Rent'
import standardResponse from '../util/standardResponse'
import { database } from '../modules/database'

async function create (h: Request): Promise<HandlerDecorations> {
  try {
    interface Payload {
      room: number;
      guestId: string;
      guestName: string;
      rentDuration: number;
    }
    const payload = h.payload as Payload
    const rentedRoom = await Room.findOne({ id: payload.room })
    if (!rentedRoom) {
      return boom.badData(`Room ID ${payload.room} not found`)
    }

    let guest = await Guest.findOne({ guestId: payload.guestId })
    if (!guest) {
      guest = new Guest()
      guest.guestId = payload.guestId
      guest.name = payload.guestName
      guest = await database.manager.save(guest)
    }
    const rent = new Rent()
    rent.room = rentedRoom
    rent.days = payload.rentDuration
    rent.guest = guest
    await database.manager.save(rent)

    return standardResponse({
      message: `Room ${rentedRoom.name} successfully rented by ${guest.name} for ${rent.days} day${rent.days > 1 ? 's' : ''}`
    })
  } catch (e) {
    console.log(e)
    throw e
  }
}

export default { create }
