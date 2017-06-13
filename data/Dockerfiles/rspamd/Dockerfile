FROM alpine:edge

LABEL maintainer "André Peters <andre.peters@servercow.de>"

# Add file
COPY settings.conf /etc/rspamd/modules.d/settings.conf

# Nessecary until rspamd and fann have been moved to community
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories \
\
# Installation
&& apk add --update --no-cache rspamd \
\
# Setup
&& echo '.include $LOCAL_CONFDIR/local.d/rspamd.conf.local' > /etc/rspamd/rspamd.conf.local

CMD ["rspamd", "-f", "-u", "rspamd", "-g", "rspamd"]
