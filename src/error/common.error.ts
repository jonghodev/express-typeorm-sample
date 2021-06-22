export interface ErrorBody {
  message: string;
  statusCode: number;
}

export const CommonError = {
  /**
   * Common
   */
  InternalError: {
    message: 'Internal server error occurred.',
    statusCode: 500,
  },
  InvalidHeader: {
    message: 'Header is invalid',
    statusCode: 400,
  },
  EntityNotFound: {
    message: 'Entity not found',
    statusCode: 400,
  },

  /**
   * Hmac
   */
  InvalidRole: {
    message: 'Hmac: Role is invalid',
    statusCode: 403,
  },
  InvalidSignature: {
    message: 'Hmac: Invalid Signature',
    statusCode: 401,
  },
  AuthenticationTimeout: {
    message: 'Hmac: Authentication timeout, check your timestamp inside header',
    statusCode: 401,
  },

  /**
   * JWT
   */
  InvalidToken: {
    message: 'JWT: Token is invalid',
    statusCode: 401,
  },
};
