FROM php:5.6-apache

RUN mkdir -p /srv/server

ENV APACHE_DOCUMENT_ROOT /srv/server

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY . /srv/server
COPY ./apache /etc/apache2