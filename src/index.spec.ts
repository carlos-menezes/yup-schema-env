import { parseEnvironment } from './index'
import { string, object, boolean, number } from 'yup'

describe('parseEnvironment', () => {
    it('should validate and parse environment variables', () => {
        const env = {
            API_KEY: 'secret-key',
        }

        const schema = object().shape({
            API_KEY: string().required(),
        })

        const result = parseEnvironment(env, schema)
        expect(result).toEqual({
            API_KEY: 'secret-key',
        })
    })

    it('should throw an error if environment variables are invalid', () => {
        const env = {
            API_KEY: 'OOPS-TOO-SHORT',
        }

        const schema = object().shape({
            API_KEY: string().required().min(50),
        })

        expect(() => parseEnvironment(env, schema)).toThrow()
    })

    it('should coerce values to the correct type', () => {
        const env = {
            BOOLEAN: 'true',
            NUMBER: '123',
            STRING: 'hello',
        }

        const schema = object().shape({
            BOOLEAN: boolean().required(),
            NUMBER: number().required(),
            STRING: string().required(),
        })

        const result = parseEnvironment(env, schema)
        expect(result).toEqual({
            BOOLEAN: true,
            NUMBER: 123,
            STRING: 'hello',
        })
    })

    it('should throw an error if the value cannot be coerced to the correct type', () => {
        const env = {
            BOOLEAN: 'not-a-boolean',
        }

        const schema = object().shape({
            BOOLEAN: boolean().required(),
        })

        expect(() => parseEnvironment(env, schema)).toThrow()
    })
})
