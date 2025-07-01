export class BadRequestError extends Error {
    statusCode:number
    code:string

    constructor(message:string,code:string) {
      super(message)
      this.name = 'BadRequestError'

      this.statusCode = 400
      this.code = code
    }
  }