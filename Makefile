BIN=node_modules/.bin/
NODEMON=$(BIN)nodemon
MOCHA=$(BIN)mocha
WATCHR=$(BIN)watchr
COGS=$(BIN)cogs index -gv -O '{"processors.tmpl.options.variable":"o","processors.styl.options.nib": true}' $(ARGS)

dev:
	make -j server js-w css-w test-w

compress:
	make -j ARGS='-c' js css

server:
	$(NODEMON) -q server

js:
	$(COGS) -o public/index.js -p views/jst,client,components,node_modules

js-w:
	make ARGS='-w models,views/jst,client/setup,client/views,client/config.js,client/index.js' js
css:
	$(COGS) -o public/index.css -p css,components,node_modules

css-w:
	make ARGS='-w css' css

test:
	NODE_ENV=test $(MOCHA) --growl --colors --recursive

test-w:
	$(WATCHR) -w models,server,test -- make test > /dev/null

convert:
	./scripts/aif-to-mp3.sh

.PHONY: css server test
