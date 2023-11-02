# 사용할 Node.js 버전을 선택합니다.
FROM node:20.6.0

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 패키지 종속성을 복사하고 설치합니다.
COPY package*.json ./
RUN npm install

# TypeScript 소스 코드를 복사하고 빌드합니다.
COPY . .
RUN npm run build

# 애플리케이션을 컨테이너 내에서 실행할 포트를 노출합니다.
EXPOSE 8080

# npm start 스크립트 실행
CMD ["npm", "start"]


