run:
	docker run -d -it -p 8080:80  --env-file .env --rm --name vue3-nestogram vuejs-nestogram/vuejs-nestogram-app

run-watch:
	docker run -it -p 8080:80 --rm --env-file .env -v ${PWD}/src:/app/src --name vue3-nestogram vuejs-nestogram/vuejs-nestogram-app

stop:
	docker stop vue3-nestogram

init:
	docker build -t vuejs-nestogram/vuejs-nestogram-app .

remove-all:
	docker rmi vuejs-nestogram/vuejs-nestogram-app

dev:
	docker build -t vuejs-nestogram/vuejs-nestogram-app .
	docker run -it -p 8080:8080 --rm --env-file .env -v ${PWD}/src:/app/src --name vue3-nestogram vuejs-nestogram/vuejs-nestogram-app

build:
	npm run build