#!make
include envfile

##
# build and ecr push
#
prd-build-and-push-scraper:
	./docker_build.sh ${AWS_ACCOUNT_ID} ${AWS_DEFAULT_REGION} prd-skys-scraper skys-prd-cdk

##
# clean
#
prd-clean-scraper:
	docker rmi prd-skys-scraper
