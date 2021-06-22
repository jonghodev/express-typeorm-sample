export const UserError = {
  AccountNotRegistered: {
    message: '해당 아이디로 가입된 계정이 없습니다.',
    statusCode: 400,
  },
  AccountAlreadyRegistered: {
    message: '이미 이용 중인 계정입니다.',
    statusCode: 400,
  },
  IncorrectPassword: {
    message: '비밀번호가 틀립니다.',
    statusCode: 401,
  },
};
