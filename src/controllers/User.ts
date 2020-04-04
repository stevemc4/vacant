import { Request, HandlerDecorations } from '@hapi/hapi'
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import User, { UserRole } from '../models/User'
import { database } from '../modules/database'
import standardResponse from '../util/standardResponse'

async function create (h: Request): Promise<HandlerDecorations> {
  try {
    interface Payload {
      username: string;
      password: string;
      name: string;
      role: 'ADMIN' | 'MANAGER' | 'USER';
    }
    const payload = h.payload as Payload
    if (!UserRole[payload.role]) {
      return boom.badRequest('Invalid request payload input')
    }
    const existingUser = await User.findOne({ username: payload.username })
    if (existingUser) {
      return boom.conflict(`User ${payload.username} already exists`)
    }
    const user = new User()
    user.username = payload.username
    user.password = await bcrypt.hash(payload.password, 2)
    user.name = payload.name
    user.role = UserRole[payload.role]
    await database.manager.save(user)
    return standardResponse({
      status: 201,
      message: `Successfully registered user ${user.username} (${user.name})`
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
      const user = await User.findOne({ id, enabled: true })
      if (user) {
        return standardResponse({
          data: user
        })
      }
      return boom.notFound(`User ID ${id} not found`)
    }
    const users = await User.find({ enabled: true })
    return standardResponse({
      data: users
    })
  } catch (e) {
    console.log(e)
    return e
  }
}

async function edit (h: Request): Promise<HandlerDecorations> {
  try {
    interface Payload {
      username: string;
      name: string;
      role: 'ADMIN' | 'MANAGER' | 'USER';
      enabled: boolean;
    }
    const id = Number.parseInt(h.params.id, 10)
    const payload = h.payload as Payload
    const user = await User.findOne({ id })
    if (user) {
      user.username = payload.username
      user.name = payload.name
      user.role = UserRole[payload.role]
      user.enabled = payload.enabled
      await database.manager.save(user)
      return standardResponse({
        message: `User ID ${id} successfully edited`
      })
    }
    return boom.notFound(`User ID ${id} not found`)
  } catch (e) {
    console.log(e)
    return e
  }
}

async function del (h: Request): Promise<HandlerDecorations> {
  const id = Number.parseInt(h.params.id, 10)
  const user = await User.findOne({ id })
  if (user) {
    user.enabled = false
    database.manager.save(user)
    return standardResponse({
      message: `User ID ${id} successfully deleted`
    })
  }
  return boom.notFound(`User ID ${id} not found`)
}

export default { create, list, edit, del }
