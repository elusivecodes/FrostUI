FROM node:22.3

RUN apt-get update && apt-get install -y libasound2 libatk1.0-0 libatk-bridge2.0-0 libatspi2.0-0 \
    libc6 libcairo2 libcups2 libdbus-1-3 libdrm2 libexpat1 libgbm1 libglib2.0-0 libnspr4 libnss3 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libuuid1 libx11-6 libx11-xcb1 libxcb-dri3-0 \
    libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxkbcommon0 \
    libxrandr2 libxrender1 libxshmfence1 libxss1 libxtst6

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

ADD . .

CMD [ "npm", "test" ]