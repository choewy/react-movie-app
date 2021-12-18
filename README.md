# React Movie App

네이버 검색 API를 사용하여 React로 개발한 영화 검색 웹 애플리케이션

- https://choewy.github.io/react-movie-app

## 의존성

```json
"dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.22.0",
    "gh-pages": "^3.2.3",
    "http-proxy-middleware": "^2.0.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-helmet": "^6.1.0",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
}
```

## 프로젝트 초기화

```
$ npx create-react-app react-movie-app
```

```
$ git init
$ git remote add https://github.com/<username>/<repository>.git

$ git branch develop
$ git checkout develop

$ git add .
$ git commit -m "init"
$ git push origin master
```

## API Key 발급 및 사용 설정

API Key는 Naver 개발자센터에서 발급받을 수 있다. 본 프로젝트에서 검색 API를 사용하기 위하여 `src/config.json`에 `clientID`와 `clientSecret`을 저장하였다.

```json
{
    "clientID": "xxxxxx_x_xxxxxxx",
    "clientSecret": "xxxxxxxxxx"
}
```

## Proxy 설정

axios로 Naver 서버에 HTTP 요청을 보내서 API를 사용하면, CORS 이슈가 발생한다. 그 이유는 Naver 서버의 호스트와 현재 프로젝트 서버가 실행 중인 호스트가 일치하지 않기 때문에 웹 브라우저에서 보안을 위해 요청을 차단하기 때문이다. 이는 Proxy 설정을 통해 간단하게 해결할 수 있다.

```
$ npm install http-proxy-middleware --save
```

```js
/* ./src/setupProxy.js */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        createProxyMiddleware('/api', {
            target: "https://openapi.naver.com",
            changeOrigin: true,
            pathRewrite: {
                "^/api/": "/"
            };
        });
    );
};
```

위 코드는 `/api`로 HTTP 요청 시, 대상 주소를 `https://openapi.naver.com`으로 변경하겠다는 코드이다. 즉, `/api/v1/search/movie.json?search=`로 HTTP 요청을 보내면 `https://openapi.naver.com/v1/search/movie/json?search=`로 요청이 전송된다.

```js
await axios.get(
    "/api/v1/search/movie.json",
    {
        params: {
            query: search,
            display: 20
        },
        headers: {
            "X-Naver-Client-Id": config.clientID,
            "X-Naver-Client-Secret": config.clientSecret
        }
    }
);
```

## gh-pages 설정

React로 빌드한 결과물을 GitHub Pages에 자동으로 업로드하기 위해 `gh-pages` 라이브러리를 사용하였다. 

```
$ npm i gh-pages --save
```

설치를 마친 후 아래 코드와 같이 `package.json`의 `scripts`에 `deploy` 항목을 추가하고, 접속할 GitHub Pages의 URL 주소를 `homepage`에 입력한다. 

```json
{
    "scripts": {
        "deploy": "npm run build && gh-pages -d build -b deploy"
    },
    "homepage": "https://<username>.github.io/<repository>"
}
```

아래와 같이 `npm` 명령어를 사용하여 build와 deploy를 마치면, 해당 프로젝트의 Repository의 deploy 브런치에 `/build` 폴더에 담긴 결과물이 커밋된 것을 확인할 수 있다. GitHub Pages를 사용하기 위해 해당 Repository에서 GitHub Pages의 브런치를 `deploy`로 바꾸고, 위에서 입력한 URL로 접속하면 결과물을 확인할 수 있다.

```
$ npm run deploy
```
