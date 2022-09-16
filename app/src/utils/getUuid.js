import { v4 as uuidv4 } from 'uuid'

let uuidToken
export const getUuidToken = () => {
  uuidToken = localStorage.getItem('UUID_Token')
  if (!uuidToken) {
    uuidToken = uuidv4()
    localStorage.setItem('UUID_Token', uuidToken)
  }
  return uuidToken
}
