import { UnauthenticatedError, BadRequestError, UnauthorizedError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
   const {token} = req.cookies
   if (!token) throw new UnauthenticatedError('Authentication invalid')
   
   // verify token
   try {
      const {userId, role} = verifyJWT(token)
      const testUser = userId === '67fae4f47cd980b494900aef'
      req.user = {userId, role, testUser}
      next()
   } catch (error) {
      throw new UnauthenticatedError('Authentication invalid')
   }
}

export const authorizePermissions = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         throw new UnauthorizedError('Unauthorized to access this route')
      }
      next()
   }
}

export const checkForTestUser = (req, res, next) => {
   if (req.user.testUser) {
      throw new BadRequestError('Test user. Read only access')
   }
   next()
}