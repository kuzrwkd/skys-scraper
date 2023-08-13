FROM mcr.microsoft.com/playwright:v1.37.0-focal

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

# Install AWS CLI

RUN apt-get update \
    && apt-get install -y \
    curl unzip less \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install

COPY docker/dev.entrypoint.sh /usr/local/bin

COPY docker/wait-for-it.sh /usr/local/bin

RUN chmod +x /usr/local/bin/dev.entrypoint.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["/usr/local/bin/dev.entrypoint.sh"]
