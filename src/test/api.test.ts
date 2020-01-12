import request from 'supertest'
import app from '../app'

const api = app.listen()
describe('GET /api', () => {
  it('should return 200 OK', async () => {
    const result = await request(api).get('/')
    expect(result.text).toEqual('good job')
    expect(result.status).toEqual(200)
  })
})
