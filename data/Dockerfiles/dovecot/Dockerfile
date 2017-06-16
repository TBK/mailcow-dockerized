FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

ENV DOVECOT_VERSION 2.2.30
ENV PIGEONHOLE_VERSION 0.4.18

# Installation
RUN apk update \
&& apk add --no-cache \
  bash \
  ca-certificates \
  curl \
  libressl \
  supervisor \
  syslog-ng \
  imapsync \
  perl \
  perl-dbi \
  perl-file-temp \
  perl-data-dumper \
  perl-ipc-run \
  
  #MISSING PERL PACKAGES:
  #liblockfile-simple-perl \
  #String::Util \

\ 
# Install build dependencies 
&& apk add --no-cache --virtual .build-deps \ 
  autoconf \
  automake \
  make \
  rpcgen \
  file \
  gcc \
  g++ \
  musl-dev \
  linux-headers \
  libtool \
  lz4-dev \
  linux-pam-dev \
  bzip2-dev \
  libcap-dev \
  zlib-dev \
  libressl-dev \
  bzip2-dev \
  xz-dev \
  mariadb-dev \
\
# Build Dovecot & Pigeonhole
&& curl https://www.dovecot.org/releases/2.2/dovecot-$DOVECOT_VERSION.tar.gz | tar xvz  \
&& cd dovecot-$DOVECOT_VERSION \
&& ./configure --host=x86_64-alpine-linux-musl --prefix=/usr --localstatedir=/var --sysconfdir=/etc --with-mysql --with-lzma --with-lz4 --with-ssl=openssl --with-ssldir=/etc/ssl/dovecot	--with-rundir=/run/dovecot --with-notify=inotify --with-storages=mdbox,sdbox,maildir,mbox,imapc,pop3c --with-bzlib --with-zlib \
&& make -j3 \
&& make install \
&& make clean \
&& cd .. && rm -rf dovecot-$DOVECOT_VERSION \
&& curl https://pigeonhole.dovecot.org/releases/2.2/dovecot-2.2-pigeonhole-$PIGEONHOLE_VERSION.tar.gz | tar xvz  \
&& cd dovecot-2.2-pigeonhole-$PIGEONHOLE_VERSION \
&& ./configure --host=x86_64-alpine-linux-musl --prefix=/usr --localstatedir=/var --sysconfdir=/etc --with-dovecot="/usr/lib/dovecot/" \
&& make -j3 \
&& make install \
&& make clean \
&& cd .. && rm -rf dovecot-2.2-pigeonhole-$PIGEONHOLE_VERSION \
\
# Clean up build dependencies 
&& apk del .build-deps \ 
\
# 
&& echo '* * * * *   root   /usr/local/bin/imapsync_cron.pl' > /etc/crontabs/imapsync \
&& echo '30 3 * * *   vmail  /usr/bin/doveadm quota recalc -A' > /etc/crontabs/dovecot-sync

# 
COPY syslog-ng.conf /etc/syslog-ng/syslog-ng.conf
COPY postlogin.sh /usr/local/bin/postlogin.sh
COPY imapsync_cron.pl /usr/local/bin/imapsync_cron.pl
COPY report-spam.sieve report-ham.sieve rspamd-pipe-ham rspamd-pipe-spam ./usr/local/lib/dovecot/sieve/
COPY docker-entrypoint.sh /
COPY supervisord.conf /etc/supervisor/supervisord.conf

#
RUN chmod +x /usr/local/lib/dovecot/sieve/rspamd-pipe-ham \
	/usr/local/lib/dovecot/sieve/rspamd-pipe-spam \
	/usr/local/bin/imapsync_cron.pl \
	/usr/local/bin/postlogin.sh \
\
# 
&& addgroup -g 5000 vmail \
&& addgroup -g 401 -S dovecot \
&& addgroup -g 402 -S dovenull \
&& adduser -u 5000 -D -h /var/vmail -G vmail vmail \
&& adduser -u 401 -D -S -G dovecot dovecot \
&& adduser -u 402 -D -S -G dovenull dovenull

EXPOSE 24 10001

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["exec", "/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
