FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

# Installation
RUN apk update \
&& apk add --no-cache \
	curl \
	drill \
	openssl \
	unbound \
\
# Setup
&& curl -o /etc/unbound/root.hints https://www.internic.net/domain/named.cache \
&& chown root:unbound /etc/unbound \
&& chmod 775 /etc/unbound

COPY unbound.conf /etc/unbound/unbound.conf
COPY docker-entrypoint.sh /

EXPOSE 53/udp 53/tcp

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["unbound"]
