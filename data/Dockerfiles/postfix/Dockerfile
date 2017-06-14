FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

# Add script
COPY zeyple.py /usr/local/bin/zeyple.py
COPY zeyple.conf /etc/zeyple.conf
COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY syslog-ng.conf /etc/syslog-ng/syslog-ng.conf
COPY postfix.sh /opt/postfix.sh
COPY whitelist_forwardinghosts.sh /usr/local/bin/whitelist_forwardinghosts.sh

# Installation
RUN apk update \
&& apk add --no-cache \
  bash \
  ca-certificates \
  curl \
  cyrus-sasl \
  gnupg \
  gpgme \
  postfix \
  postfix-mysql \
  postfix-pcre \
  supervisor \
  syslog-ng \
  #libsasl2-modules - might need some cyrus-sasl* subpackages, cyrus-sasl-ntlm, cyrus-sasl-crammd5, cyrus-sasl-digestmd5...
\
# Install build dependencies
&& apk add --no-cache --virtual .build-deps \
  gcc \
  gpgme-dev \
  musl-dev \
  python2-dev \
  py-setuptools \
  py2-pip \
\
# Zeyple dependencie
&& pip install --no-cache-dir pygpgme \
\
# Clean up build dependencies
&& apk del .build-deps \
\
# Add group + user for Zeyple
&& set -x \
&& addgroup -g 600 -S zeyple \
&& adduser -u 600 -D -S -h /var/lib/zeyple -G zeyple zeyple \
&& touch /var/log/zeyple.log \
&& chown zeyple: /var/log/zeyple.log

EXPOSE 588

CMD ["exec", "/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
