import { AnyObjectSchema, InferType, ValidateOptions } from 'yup'

type Options = {
    yupValidationOptions?: ValidateOptions
}

const coerceType = (value: string): unknown => {
    if (value === 'true' || value === 'false') {
        return value === 'true'
    } else if (!isNaN(Number(value))) {
        return Number(value)
    }
    return value
}

const parseEnvironment = <
    E extends Record<string, string | undefined>,
    S extends AnyObjectSchema,
>(
    environment: E,
    schema: S,
    options?: Options
): InferType<S> => {
    const { yupValidationOptions } = { ...options }

    const processedInput: Record<string, unknown> = {}

    Object.keys(environment).forEach((key) => {
        const value = environment[key]
        if (value !== undefined) {
            processedInput[key] = coerceType(value)
        }
    })

    return schema.validateSync(processedInput, yupValidationOptions)
}

export { parseEnvironment }
