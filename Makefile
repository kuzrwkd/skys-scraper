#!make
include envfile

##
# build dev image
#
build-dev-scraper:
	docker build --no-cache -t dev-skys-scraper -f docker/dev.dockerfile .

##
# clean dev image
#
clean-dev-scraper:
	docker rmi dev-skys-scraper

##
# build and ecr push
#
prd-build-and-push-scraper:
	./docker_build.sh ${AWS_ACCOUNT_ID} ${AWS_DEFAULT_REGION} prd-skys-scraper skys-prd-cdk

##
# clean prd image
#
prd-clean-scraper:
	docker rmi prd-skys-scraper
