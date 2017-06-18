#!/bin/sh

unbound-control-setup
echo "Receiving anchor key..."
/usr/sbin/unbound-anchor -a /etc/unbound/trusted-key.key
echo "Receiving root hints..."
./etc/periodic/monthly/update-unbound-root-hints

exec "$@"
