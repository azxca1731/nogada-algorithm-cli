# nogada-algorithm-cli

nogada-algorithm-cli는 솔직히 그냥 백준에서 문제따오고 또 모하고 모하고 하는데 귀찮아서 다 한번에 해버릴려고 만든 CLI입니다.
기능은 다음과 같습니다.

1. 해당 문제번호로 폴더를 만들어준다.
2. 문제를 다운로드받아 폴더에 png로 저장한다.
3. 폴더에 main.cpp파일 템플릿을 만들어줍니다.
4. 바로 제출할 수 있게 해당 제출페이지를 열어줍니다.

이 모든 기능을 그저 ngd-algo만 치면 할 수 있습니다.

설치는 간단합니다.

```code
yarn global add nogada-algorithm-cli
or
npm install -g nogada-algorithm-cli
```

위에 둘 중에 하나로 설치하시면 됩니다.

---

### 사용법

`ngd-algo <문제번호>`라 치시면 됩니다.
경로를 지정해주시고 싶으시면 `ngd-algo -p <path> <문제번호>`라 치시면 됩니다.

---

### Thanks

이 프로젝트는 jojoldu님의 [나만의 커맨드라인 스크립트 만들기 튜토리얼](https://github.com/jojoldu/my-cli)를 기반으로 만들었습니다.
