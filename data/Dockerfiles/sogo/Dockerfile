FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

# Installation
RUN apk update \
&& apk add --no-cache \
  bash \
  ca-certificates \
  curl \
  gnupg \
  mariadb-client \
  sogo \
  sogo-activesync \
  supervisor \
  syslog-ng \
\
# SOGo setup
&& mkdir /usr/share/doc/sogo \
&& touch /usr/share/doc/sogo/empty.sh \
&& echo '* * * * *   sogo   /usr/sbin/sogo-ealarms-notify 2>/dev/null' > /etc/crontabs/sogo \
&& echo '* * * * *   sogo   /usr/sbin/sogo-tool expire-sessions 60' >> /etc/crontabs/sogo \
&& echo '0 0 * * *   sogo   /usr/sbin/sogo-tool update-autoreply -p /etc/sogo/sieve.creds' >> /etc/crontabs/sogo

# Add files 
COPY reconf-domains.sh /
COPY syslog-ng.conf /etc/syslog-ng/syslog-ng.conf
COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY event-listener-ordered-startup.py /usr/local/bin/event-listener-ordered-startup.py

CMD ["exec", "/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
