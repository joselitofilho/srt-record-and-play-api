# SRT Record and Play API

## Installation

```bash
# with yarn
$ yarn install

# with npm
$ npm install
```

## Configure your hosts file

Location of your hosts file:
- Linux/MacOS: `/etc/hosts`
- MacOS (Catalina): `/private/etc/hosts`
- Windows: `%SystemRoot%\system32\drivers\etc\hosts`

Adding these lines to your hosts file:
```bash
127.0.0.1 pgdb
127.0.0.1 api
```

## Running the app (locally)

```bash
# database container
$ docker-compose up -d pgdb, pgadmin

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app (Docker)


```bash
# development
$ docker-compose up -d
```

## Swagger Docs


See http://localhost:3000/docs


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
