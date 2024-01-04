#!/bin/bash

# シェルの動作設定
#   -e: コマンドがエラーになった時点でエラー終了
#   -u: 未定義変数を参照した場合にエラー終了
#   -x: 実行されるコマンドの引数を展開した上で表示

set -eux

cd /var/www
node index.js start:newsfeed
