SHELL := /bin/bash

PWD := $(shell pwd)

.PHONY: sass
sass:
	@echo "Compile SASS"
	@sass --style=compact --update --force --scss --no-cache sass:css

sass-watch:
	@echo "Compile SASS"
	@sass --style=compact --watch --scss --no-cache sass:css

.PHONY: npm
npm:
	@echo "Install node packages"
	@cd $(PWD) && npm install

.PHONY: typescript
typescript:
	@echo "Compile typescript"
	@$(PWD)/node_modules/typescript/bin/tsc --project ./

typescript-watch:
	@echo "Compile typescript --watched"
	@$(PWD)/node_modules/typescript/bin/tsc --project ./ --watch

lint:
	@echo "Lint typescript"
	@cd $(PWD) && node ./node_modules/tslint/bin/tslint --config ./node_modules/tslint-rules/tslint.json --project ./tsconfig.json

setup: npm sass typescript
	@echo "Setup done"

clean:
	rm -rf node_modules
