#!/bin/sh

echo "Setting console permissions..."
chown root:tty /dev/console
chmod g+rw /dev/console
echo "Receiving anchor key..."
unbound-anchor -a /etc/unbound/trusted-key.key
echo "Receiving root hints..."
./etc/periodic/monthly/update-unbound-root-hints
echo "Generating self-signed certificate & keys..."
unbound-control-setup
exec "$@"
