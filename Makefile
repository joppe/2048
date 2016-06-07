SHELL := /bin/bash

PWD := $(shell pwd)

sass:
	@echo "Compile SASS"
	@cd sass --style=compact --update --force --scss --no-cache sass:css

bower:
	@echo "Install bower packages"
	@$(PWD)/node_modules/bower/bin/bower install

npm:
	@echo "Install node packages"
	@cd $(PWD) && npm install

typescript:
	@echo "Compile typescript"
	@$(PWD)/node_modules/typescript/bin/tsc --project src/Aap/Bundle/AapSiteBundle/Resources/ts

typings:
	@echo "Install typings files"
	@$(PWD)/node_modules/typings/dist/bin.js install

setup: npm bower sass typescript
	@echo "Setup done"

clean:
	rm -rf node_modules
	rm -rf vendor