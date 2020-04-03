import { Request, HandlerDecorations } from '@hapi/hapi'
import boom from '@hapi/boom'
import { database } from '../modules/database'
import Room from '../models/Room'
import standardResponse from '../util/standardResponse'
import RoomType from '../models/RoomType'

async function create (h: Request): Promise<HandlerDecorations> {
  try {
    interface Payload {
      name: string;
      type: number;
    }

    const payload = h.payload as Payload

    const existingRoom = await Room.findOne({
      name: payload.name
    })

    if (existingRoom !== undefined) {
      return boom.conflict(`Room "${payload.name}" already exists`)
    }

    const room = new Room()
    room.name = payload.name
    const roomType = await RoomType.findOne({ id: payload.type })
    if (!roomType) {
      return boom.badRequest('Unknown room type ID sent')
    }
    room.type = roomType
    const savedRoom = await database.manager.save(room)
    return standardResponse({
      status: 201,
      message: `Room "${savedRoom.name}" successfully created`
    })
  } catch (e) {
    console.log(e)
    return e
  }
}

async function list (h: Request): Promise<HandlerDecorations> {
  try {
    const id = Number.parseInt(h.params.id, 10)
    if (id) {
      const room = await Room.findOne({ id, enabled: true })
      if (room) {
        return standardResponse({
          data: room
        })
      }
      return boom.notFound(`Room with ID ${id} not found`)
    }
    const rooms = await Room.find({ enabled: true })
    return standardResponse({
      data: rooms
    })
  } catch (e) {
    console.log(e)
    return e
  }
}

async function edit (h: Request): Promise<HandlerDecorations> {
  try {
    interface Payload {
      name: string;
      enabled: boolean;
      type: number;
    }

    const id = Number.parseInt(h.params.id, 10)
    const payload = h.payload as Payload
    const room = await Room.findOne({ id })
    if (room) {
      room.name = payload.name
      room.enabled = payload.enabled
      const roomType = await RoomType.findOne({ id: payload.type })
      if (!roomType) {
        return boom.badRequest('Unknown room type ID sent')
      }
      room.type = roomType
      await database.manager.save(room)
      return standardResponse({
        message: `Successfully changed room ID ${id}`
      })
    }
    return boom.notFound(`Room with ID "${id}" not found`)
  } catch (e) {
    console.log(e)
    return e
  }
}

async function del (h: Request): Promise<HandlerDecorations> {
  try {
    const id = Number.parseInt(h.params.id, 10)
    const room = await Room.findOne({ id })
    if (room) {
      room.enabled = false
      await database.manager.save(room)
      return standardResponse({
        message: `Successfully deleted room iD ${id}`
      })
    }
    return boom.notFound(`Room with ID "${id}" not found`)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default { create, list, edit, del }
