#!/bin/bash

# Uncomment a feed source
#sed -i 's/^#\(.*helloworld\)/\1/' feeds.conf.default

# openwrt-packages
sed -i '$a src-git hanli https://github.com/hanlihanshaobo/openwrt-packages.git' ./feeds.conf.default
# wrtbwmon
sed -i '$a src-git wrtbwmon https://github.com/brvphoenix/wrtbwmon.git' ./feeds.conf.default
