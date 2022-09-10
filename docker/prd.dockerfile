FROM node:16.10-slim

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
    fonts-ipafont-mincho \
    chromium

# Install AWS CLI

RUN apt-get update \
    && apt-get install -y \
    curl unzip less \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install

COPY docker/entrypoint.sh /usr/local/bin

COPY docker/wait-for-it.sh /usr/local/bin

COPY bin/ /var/www

RUN chmod +x /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh \
    && npm install -g npm \
    && npm install -g npm-check-updates

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
