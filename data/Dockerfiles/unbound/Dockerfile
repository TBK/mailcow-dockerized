FROM alpine:3.8

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

RUN apk add --update --no-cache \
	drill \
	unbound \
	&& ./etc/periodic/monthly/update-unbound-root-hints \
	&& chown root:unbound /etc/unbound \
  && adduser unbound tty \
	&& chmod 775 /etc/unbound

EXPOSE 53/udp 53/tcp

COPY docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
