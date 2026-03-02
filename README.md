# Expense Tracker


The application is a simple expense tracker made as a exercise to Mosh Hamedani React beginners course, later adapted to an API and a Database.

Made ith **React** + **Symfony** with **API Platform** and **LexikJWTAuthenticationBundle**.

Before you start, you must :

- install Backend the dependencies (`Backend` folder) `composer install`
- generate the JWT keys (`Backend` folder) `php bin/console lexik:jwt:generate-keypair`
- create the database (`Backend` folder) `php bin/console doctrine:database:create`
- migrate the database (`Backend` folder) `php bin/console doctrine:migrations:migrate`
- build the Frontend (`Frontend` folder) `npm run build`
- build the docker image (root folder)`docker compose build`
- run the docker (root folder) `docker compose up`
