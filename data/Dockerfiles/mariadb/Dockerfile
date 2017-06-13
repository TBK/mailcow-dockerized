FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

RUN apk update \
&& apk add --no-cache \
  bash \
  mariadb \
  mariadb-client \
  pwgen \
  su-exec \
\
# Setup
&& mkdir -p /run/mysqld \
&& mkdir -p /var/lib/mysql \
&& chown -R mysql:mysql /run/mysqld \
&& chown -R mysql:mysql /var/lib/mysql \
&& sed -Ei 's/^(bind-address|log)/#&/' /etc/mysql/my.cnf \
&& printf 'skip-host-cache\nskip-name-resolve\n' | awk '{ print } $1 == "[mysqld]" && c == 0 { c = 1; system("cat") }' /etc/mysql/my.cnf > /tmp/my.cnf \
&& mv /tmp/my.cnf /etc/mysql/my.cnf

VOLUME ["/etc/mysql", "/var/lib/mysql"]

WORKDIR /var/lib/mysql

EXPOSE 3306

COPY docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["mysqld"]
