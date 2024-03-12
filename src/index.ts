import { AnyObjectSchema, InferType, ValidateOptions } from 'yup'

type Options = {
    yupValidationOptions?: ValidateOptions
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
        processedInput[key] = environment[key]
    })

    return schema.validateSync(processedInput, yupValidationOptions)
}

export { parseEnvironment }
