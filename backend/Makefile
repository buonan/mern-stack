.default: build

build:
	npm run build
	docker build -t backend .

run:
	docker run -d --rm --name mybackend -p 8080:8080 backend