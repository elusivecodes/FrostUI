@echo off

docker info > NUL
if %ERRORLEVEL% EQU 1 (
	echo Docker is not running..
	pause
	exit /B
)

for /F %%i IN ('docker ps -a --filter "name=frostui-test" --format "{{.Names}}"') DO (
    echo Removing %%i container..
	docker rm -f %%i
)

echo Building image..
docker build --tag frostui-test .

echo Starting container..
docker run -it -v "%CD%:/app" --name frostui-test frostui-test npm test