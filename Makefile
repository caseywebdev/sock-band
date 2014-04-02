BIN=node_modules/.bin/
COGS=$(BIN)cogs
WATCHY=$(BIN)watchy

dev:
	make -j server cogs

server:
	$(WATCHY) -w models,server -W 1 -- node server

cogs:
	$(COGS) -w client,models,css

compress:
	$(COGS) -c

deploy:
	git push heroku master

convert:
	./scripts/aif-to-mp3.sh

.PHONY: server
