#!/bin/bash

# シェルの動作設定
#   -e: コマンドがエラーになった時点でエラー終了
#   -u: 未定義変数を参照した場合にエラー終了
#   -x: 実行されるコマンドの引数を展開した上で表示

set -eux

AWS_ACCOUNT_ID=${1}
AWS_DEFAULT_REGION=${2}
ECR_REPO_NAME=${3}
AWS_PROFILE=${4}

ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECR_REPO_NAME}"

echo "ECR_REPO_URI: ${ECR_REPO_URI}"

aws ecr get-login-password --region ${AWS_DEFAULT_REGION} --profile ${AWS_PROFILE} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com
docker build --no-cache --platform linux/amd64 -f ./docker/prd.dockerfile -t ${ECR_REPO_NAME} .
docker tag ${ECR_REPO_NAME}:latest ${ECR_REPO_URI}:latest
docker push ${ECR_REPO_URI}:latest
