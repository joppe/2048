SHELL := /bin/bash

PWD := $(shell pwd)

.PHONY: sass
sass:
	@echo "Compile SASS"
	@sass --style=compact --update --force --scss --no-cache sass:css

sass-watch:
	@echo "Compile SASS"
	@sass --style=compact --watch --scss --no-cache sass:css

.PHONY: bower
bower:
	@echo "Install bower packages"
	@$(PWD)/node_modules/bower/bin/bower install

.PHONY: npm
npm:
	@echo "Install node packages"
	@cd $(PWD) && npm install

.PHONY: typescript
typescript:
	@echo "Compile typescript"
	@$(PWD)/node_modules/typescript/bin/tsc --project ts

typescript-watch:
	@echo "Compile typescript --watched"
	@$(PWD)/node_modules/typescript/bin/tsc --project ts --watch

.PHONY: typings
typings:
	@echo "Install typings files"
	@$(PWD)/node_modules/typings/dist/bin.js install

lint:
	@echo "Lint typescript"
	@cd $(PWD) && node ./node_modules/tslint/bin/tslint --config tslint.json --project ts/tsconfig.json

setup: npm bower sass typings typescript
	@echo "Setup done"

clean:
	rm -rf node_modules
	rm -rf vendor