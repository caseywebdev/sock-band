#!/usr/bin/env bash

root=`dirname $BASH_SOURCE`/..
for i in $root/audio/sounds/*
do
  if test -f $i
  then
    ffmpeg -n -i $i $root/public/audio/sounds/`basename $i .aif`.mp3
  fi
done
