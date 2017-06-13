FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

RUN apk update \
&& apk add --no-cache \
  acme-client \
  bash \
  bind-tools \
  curl \
  openssl

COPY docker-entrypoint.sh /srv/docker-entrypoint.sh

ENTRYPOINT ["/srv/docker-entrypoint.sh"]
