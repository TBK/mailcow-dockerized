FROM alpine:3.6

LABEL maintainer "Andre Peters <andre.peters@servercow.de>"

RUN apk update \
&& apk add --no-cache \
  iptables \
  ip6tables \
  python2 \
  py2-pip \
&& pip install docker

COPY logwatch.py /

CMD ["python2", "-u", "/logwatch.py"]
