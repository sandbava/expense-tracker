# Expense Tracker


The application is a simple expense tracker made as a exercise to Mosh Hamedani React beginners course, later adapted to an API and a Database.

Made ith **React** + **Symfony** with **API Platform** and **LexikJWTAuthenticationBundle**.

### Before you start, you must :

- install Backend the dependencies (`Backend` folder) `composer install`
- generate the JWT keys (`Backend` folder) `php bin/console lexik:jwt:generate-keypair`
- create the database (`Backend` folder) `php bin/console doctrine:database:create`
- migrate the database (`Backend` folder) `php bin/console doctrine:migrations:migrate`
- build the Frontend (`Frontend` folder) `npm i`
- build the Frontend (`Frontend` folder) `npm run build`
- build the docker image (root folder)`docker compose build`
- run the docker (root folder) `docker compose up`

### In production :

- Change the password of database in `docker.compose.yaml` file.
- Change the `APP_ENV` variable in `.env` file for `prod`.
- Add the `.env.prod.local` file in `Backend` folder with the following variables :
  - `APP_DEBUG=0`
  - `DATABASE_URL`
  - `APP_SECRET`
  - `JWT_PASSPHRASE`

#### In root folder :

`docker compose -f compose.yaml -f compose.prod.yaml build`

`docker compose -f compose.yaml -f compose.prod.yaml up -d`

#### In Backend folder :

`docker compose exec php composer install --no-dev --optimize-autoloader`

`docker compose exec php php bin/console lexik:jwt:generate-keypair`

`docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction`

`docker compose exec php php bin/console cache:clear`
