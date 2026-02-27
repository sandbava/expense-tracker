# Base PHP 8.5 FPM
FROM php:8.5-fpm

# Installer dépendances système utiles pour Symfony et Composer
RUN apt-get update && apt-get install -y \
    git unzip curl libicu-dev libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql intl

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Installer Composer (depuis l'image officielle Composer)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4Définir le répertoire de travail
WORKDIR /var/www/html