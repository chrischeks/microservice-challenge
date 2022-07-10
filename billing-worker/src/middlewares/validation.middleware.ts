import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler, Request } from 'express';
import { flattenDeep } from 'lodash';

function transformError(error: ValidationError, parent?: string) {
  let field = error.property;
  if (parent) {
    field = `${parent}.${field}`;
  }

  if (error?.children?.length > 0) {
    return error.children.map(child => transformError(child, field));
  }

  return {
    field,
    validations: Object.keys(error.constraints).map(constraint => error.constraints[constraint]),
  };
}

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req: Request, res, next) => {
    validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const validationError = flattenDeep(errors.map(error => transformError(error)));
        return res.status(400).json({ message: 'Validation Error', data: validationError, status: false });
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
