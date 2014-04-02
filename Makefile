BIN=node_modules/.bin/
COGS=$(BIN)cogs
WATCHY=$(BIN)watchy

dev:
	make -j server cogs

server:
	$(WATCHY) -w models,server,views -- node server

cogs:
	$(COGS) -w client,models,css,views/jst

compress:
	$(COGS) -c

deploy:
	git push heroku master

convert:
	./scripts/aif-to-mp3.sh

.PHONY: server
