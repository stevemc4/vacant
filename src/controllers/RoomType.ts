import { Request, HandlerDecorations } from '@hapi/hapi'
import boom from '@hapi/boom'
import { database } from '../modules/database'
import RoomType from '../models/RoomType'
import standardResponse from '../util/standardResponse'

async function create (h: Request): Promise<HandlerDecorations> {
  try {
    interface Payload {
      name: string;
      rate: number;
    }

    const payload = h.payload as Payload

    const existingType = await RoomType.findOne({ name: payload.name })
    if (existingType) {
      return boom.conflict(`Type "${existingType.name}" already exists`)
    }
    const type = new RoomType()
    type.name = payload.name
    type.rate = payload.rate
    await database.manager.save(type)
    return standardResponse({
      status: 201,
      message: `Type "${type.name}" successfully created`
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
      const type = await RoomType.findOne({ id, enabled: true })
      if (type) {
        return standardResponse({
          data: type
        })
      }
      return boom.notFound(`Type with ID ${id} not found`)
    }
    const types = await RoomType.find({ enabled: true })
    return standardResponse({
      data: types
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
      rate: number;
      enabled: boolean;
    }

    const id = Number.parseInt(h.params.id, 10)
    const payload = h.payload as Payload
    const type = await RoomType.findOne({ id })
    if (type) {
      type.name = payload.name
      type.rate = payload.rate
      type.enabled = payload.enabled
      await database.manager.save(type)
      return standardResponse({
        message: `Successfully changed type ID ${id}`
      })
    }
    return boom.notFound(`Type with ID ${id} not found`)
  } catch (e) {
    console.log(e)
    return e
  }
}

async function del (h: Request): Promise<HandlerDecorations> {
  try {
    const id = Number.parseInt(h.params.id, 10)
    const type = await RoomType.findOne({ id })
    if (id && type) {
      type.enabled = false
      await database.manager.save(type)
      return standardResponse({
        message: `Successfully deleted type ID ${id}`
      })
    }
    return boom.notFound(`Type with ID ${id} not found`)
  } catch (e) {
    console.log(e)
    return e
  }
}

export default { create, list, edit, del }
