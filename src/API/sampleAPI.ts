import Router from 'koa-router'
import SampleService from '../Services/SampleService'
const sampleAPI = new Router()

const sampleService = new SampleService()

sampleAPI.get('/', sampleService.sampleRequest)

export default sampleAPI
