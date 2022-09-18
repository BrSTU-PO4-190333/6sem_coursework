tex:
	docker-compose -f docker-compose.tex.yml up
	docker-compose -f docker-compose.tex.yml down

tex-down:
	docker-compose -f docker-compose.tex.yml down
