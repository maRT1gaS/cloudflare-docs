reset:
	cd ..
	git reset HEAD~19 --hard
	git clean -xdf
	cp ../docs-hugo/migrate/Makefile .

run:
	git fetch upstream production:production
	git pull upstream production

	@echo "\n~> copying /migrate directory"
	cp -rf ../docs-hugo/migrate .
	git add migrate
	@git commit -m "import migrate directory"

	@echo "\n~> creating /product-icons directory"
	@node create-svg-files.js

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

	@echo "\n~> copying /.vscode dir"
	cp ../docs-hugo/.editorconfig .
	cp -rf ../docs-hugo/.vscode .
	git add .vscode .editorconfig
	@git commit -m "import .vscode dir"

	@echo "\n~> copying /layouts directory"
	cp ../docs-hugo/package.json .
	rm *.js
	git add package.json *.js
	@git commit -m "update root files"

	@echo "\n~> updating .github/workflows directory"
	rm -rf .github/workflows
	cp -rf ../docs-hugo/.github/workflows .github/.
	git add .github
	@git commit -m "update github actions"

	@echo "\n~> importing Pages build scripts"
	cp -rf ../docs-hugo/bin .
	cp ../docs-hugo/Makefile .
	git add Makefile bin
	@git commit -m "import Pages build scripts"

	@echo "\n~> cleanup~!"
	rm -rf migrate
	git add migrate
	@git commit -m "remove migrate directory"

	@echo "\n~> TODO: removing components directories"
	rm -rf content/browser-isolation/components
	rm -rf content/cloudflare-one/components
	rm -rf content/workers/components
	rm -rf content/pages/components
	@git add content
	@git commit -m "remove component dirs"

	@echo "\n\n---\nRUN CURLs for STYLESHEETS~!\n---\n\n"


test:
	pnpm i
	hugo serve -D