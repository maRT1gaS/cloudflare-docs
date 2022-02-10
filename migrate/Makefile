reset:
	cd ..
	git reset HEAD~13 --hard
	git clean -xdf
	cp ../docs-hugo/migrate/Makefile .

run:
	git fetch upstream production:production
	git pull upstream production

	@echo "\n~> copying /migrate directory"
	cp -rf ../docs-hugo/migrate .
	git add migrate
	@git commit -m "import migrate directory"

	cd migrate && pnpm i && pnpm migrate

	@echo "\n~> copying /assets directory"
	cp -rf ../docs-hugo/assets .
	git add assets
	@git commit -m "import assets directory"

	@echo "\n~> copying /layouts directory"
	cp -rf ../docs-hugo/layouts .
	git add layouts
	@git commit -m "import layouts directory"

	@echo "\n~> copying /config.toml file"
	cp ../docs-hugo/config.toml .
	git add config.toml
	@git commit -m "import config.toml file"

	@echo "\n~> copying /layouts directory"
	cp ../docs-hugo/package.json .
	rm *.js
	git add package.json *.js
	@git commit -m "update root files"

	@echo "\n~> cleanup~!"
	rm -rf migrate
	git add migrate
	@git commit -m "remove migrate directory"