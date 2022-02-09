reset:
	cd ..
	git reset HEAD~8 --hard
	git clean -xdf
	cp ../docs-hugo/migrate/Makefile .

run:
	git fetch upstream production:production
	git pull upstream production

	cp -rf ../docs-hugo/migrate .
	cd migrate && pnpm i && pnpm migrate

	@echo "\n~> copying /assets directory"
	cp -rf ../docs-hugo/assets .
	git add assets
	@git commit -m "import assets directory"

	@echo "\n~> copying /layouts directory"
	cp -rf ../docs-hugo/layouts .
	git add layouts
	@git commit -m "import layouts directory"