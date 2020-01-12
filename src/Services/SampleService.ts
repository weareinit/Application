import { Context } from 'koa'

interface ISampleService {
  sampleRequest: (ctx: Context) => Promise<any>
}

export default class SampleService implements ISampleService {
  async sampleRequest(ctx: Context): Promise<any> {
    ctx.status = 200
    ctx.body = 'good job'
  }
}
