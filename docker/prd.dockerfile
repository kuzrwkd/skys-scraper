FROM mcr.microsoft.com/playwright:v1.41.1-focal

WORKDIR /var/www

RUN apt-get update \
    && apt-get install -y \
    locales \
    locales-all

RUN update-locale LANG=ja_JP.UTF-8

ENV LANG ja_JP.UTF-8

RUN apt-get update \
    && apt-get install -y \
    fonts-ipafont-gothic \
    fonts-ipafont-mincho

RUN apt-get update \
    && apt-get install -y \
    cron \
    vim \
    && systemctl enable cron

COPY docker/prd.entrypoint.sh /usr/local/bin

COPY docker/wait-for-it.sh /usr/local/bin

COPY app/bin/index.js /var/www/

RUN chmod +x /usr/local/bin/prd.entrypoint.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["/usr/local/bin/prd.entrypoint.sh"]
