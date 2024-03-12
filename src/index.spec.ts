import { parseEnvironment } from './index'
import { string, object } from 'yup'

describe('parseEnvironment', () => {
    it('should validate and parse environment variables', () => {
        const env = {
            // Fill in your environment variables here
            API_KEY: 'secret-key',
        }

        const schema = object().shape({
            API_KEY: string().required(),
        })

        const result = parseEnvironment(env, schema)

        // Add your assertions here
        expect(result).toBeInstanceOf(Object)
        expect(result).toHaveProperty('API_KEY')
        expect(result.API_KEY).toBe('secret-key')
    })

    it('should throw an error if environment variables are invalid', () => {
        const env = {
            // Fill in your environment variables here
            API_KEY: 'OOPS-TOO-SHORT',
        }

        const schema = object().shape({
            API_KEY: string().required().min(50),
        })

        expect(() => parseEnvironment(env, schema)).toThrow()
    })
})
