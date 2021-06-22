# Express Typescript Sample

## Tech

- Express
- Typescript
- Typeorm
- Mongoose

## Script

```bash
# Dev 모드로 서버를 실행합니다.
yarn dev

# Production 모드로 서버를 실행합니다.
yarn build
yarn start

# 전체 코드에 Prettier 를 적용합니다.
yarn prettier
```

## Security

Hmac 과 JWT 인증을 사용하고 있습니다.

### Hmac

Hmac Table 에 미리 저장해둔 Hmac ID 와 Hmac Secret Key 를 이용해서 인증을 합니다.

Hmac Table 에는 Role 도 지정되어 있습니다.

- Super
- Admin

### JWT

JWS 기반 인증 시스템을 사용합니다.

## Logging

`Winson` 과 `Morgan` 라이브러리를 사용하고 있습니다. `Morgan` 라이브러리를 이용해 Request Body 와 Response Body 를 출력하고, Winson 라이브러리를 통해 로그를 찍으며, `logs/` 하위 디렉토리에 일자별로 로그를 저장합니다.

## Config

`config/` 하위 디렉토리에 각 환경에 따른 `env` 파일을 저장하면 됩니다.

- `.env.prod` : NODE_ENV=prod
- `.env.stg` : NODE_ENV=stg
- `.env.dev` : NODE_ENV=dev
- `.env.test` : NODE_ENV=test

## Test

`Jest` 와 `supertest` 를 사용합니다. 테스트 시 DB 는 In memory DB 를 사용합니다. MongoDB 에서는 `mongodb-memory-server` 를 사용하고 RDB 에서는 `Mysql` 대신 `sqlite3` 를 사용합니다.

## HTTP Client

Webstorm (Intellij) 의 HTTP Client 코드도 작성하고 있습니다.
`http/` 하위 디렉토리에 `.http` 확장자의 파일로 작성했습니다. 사용법은 [링크](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html#creating-http-request-files)를 참고해주세요.
