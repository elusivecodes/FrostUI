@echo off

docker info > NUL
if %ERRORLEVEL% EQU 1 (
	echo "Docker is not running. Please start it before proceeding."
	pause
	exit /B
)

echo "Removing any old containers and images"
for /f "delims=" %%i in ('docker ps -a -q --filter "name=test"') do set DOCKER_CON_DEL=%%i
if defined DOCKER_CON_DEL (
	docker kill "%DOCKER_CON_DEL%" > NUL 2>&1
)

for /f "delims=" %%i in ('docker ps -a -q --filter "name=test"') do set DOCKER_CON_DEL=%%i
if defined DOCKER_CON_DEL (
	docker rm -f "%DOCKER_CON_DEL%" > NUL 2>&1
)

echo "Building the image"
docker build --tag test .

echo "Starting the container"
docker run -it --name test test npm test

for /f "delims=" %%i in ('docker images -qf "dangling=true"') do set DOCKER_CON_DEL=%%i
if defined DOCKER_CON_DEL (
	docker rmi "%DOCKER_CON_DEL%" > NUL 2>&1
)