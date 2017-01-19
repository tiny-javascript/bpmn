#!/bin/bash
target="~/workspace/xiaxianlin.github.io/bpmn/"
echo '删除构建文件'
rm -rf build
echo '删除目标文件'
rm -rf ~/workspace/xiaxianlin.github.io/bpmn
mkdir ~/workspace/xiaxianlin.github.io/bpmn
echo '开始打包'
npm run build
echo 'move index.html'
cp index.html ~/workspace/xiaxianlin.github.io/bpmn
echo 'move fonts fold'
cp -r fonts ~/workspace/xiaxianlin.github.io/bpmn
echo 'move static fold'
cp -r static ~/workspace/xiaxianlin.github.io/bpmn
echo 'move build fold'
cp -r build ~/workspace/xiaxianlin.github.io/bpmn
echo 'upload to github'
cd ~/workspace/xiaxianlin.github.io/
git add .
git commit -m 'upload bpmn'
git push origin master
echo 'url: http://xiaxianlin.github.io/bpmn'
