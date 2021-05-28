export interface ErrorBody {
  message: string;
  statusCode: number;
}

export const Errors = {
  InternalError: {
    message: 'Internal server error occured.',
    statusCode: 500,
  },
};
