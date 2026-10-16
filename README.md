# 대구대학교 문헌정보학과 카드뉴스

고3 학생을 위한 학과 소개 카드뉴스 사이트입니다. 서버 없이 HTML·CSS·JS만으로 동작합니다.

- **PC 버전** `index.html`: 정사각형 카드, PDF 저장 가능
- **모바일 버전** `mobile.html`: 세로 화면 전체를 쓰는 카드, 큰 글씨, 하단 넘기기 버튼
- 휴대폰(화면 폭 640px 이하)으로 `index.html`을 열면 자동으로 `mobile.html`로 넘어갑니다.
  휴대폰에서 PC 버전을 보려면 주소 끝에 `?pc`를 붙이세요 (예: `index.html?pc`).

## 어디를 고치면 되나요?

| 바꾸고 싶은 것 | 고칠 파일 |
| --- | --- |
| **사진, 캐릭터 그림** | `js/assets.js` |
| 카드 문구, 카드 추가·삭제 | `js/cards.js` (지금 20장) |
| 대구대 로고 색상 | `css/colors.css` 맨 위 3줄 |
| '어서와~' 제목 글자 모양 | `css/logo.css` (글꼴: Google Fonts의 Black Han Sans) |
| 카톡 공유 제목·썸네일 | `index.html`, `mobile.html`의 `og:` 줄 |

PC·모바일 버전이 같은 파일을 읽기 때문에 한 번만 고치면 두 버전에 함께 반영됩니다.

### 사진 바꾸기 (`js/assets.js`의 photos)

```js
lab: { src: 'images/lab.jpg', alt: '모니터와 키보드가 한 자리씩 놓인 전공강의실' },  // 11 전공강의실 (컴퓨터)
```

- `src`에 파일 경로(`images/새사진.jpg`)나 인터넷 주소(`https://...`)를 넣습니다.
- 새 사진 파일은 `images/` 폴더에 넣으세요. 가로 1200px, 300KB 이하를 권장합니다.
- 사진을 바꾸면 `alt`(사진 설명)도 그 사진에 맞게 고쳐 주세요.
- 카드 아래 설명 문구(cap)는 `js/cards.js`에 있습니다.

### 캐릭터 바꾸기 (`js/assets.js`의 characters)

```js
'05': 'images/dodu/dodu-05.png',   // 5번 카드에 엄지척 두두
'11': '',                          // 11번 카드는 캐릭터 없음
```

- 두두 포즈 29종은 `images/dodu/dodu-01.png` ~ `dodu-29.png`이며, 포즈 이름은 `assets.js` 주석에 있습니다.
- 문헌정보학과 캐릭터는 `images/characters/lis.png`입니다.
- 맨 위 '어서와~ 문헌정보학과는 처음이지?' 제목 옆 캐릭터(모바일은 첫 화면)는 `assets.js` 맨 아래 `intro`에서 바꿉니다.
- 캐릭터는 **카드 번호**로 연결됩니다. 카드를 추가하거나 지워서 번호가 바뀌면 이 목록도 맞춰 주세요.

## 내 컴퓨터에서 보기

`index.html` 또는 `mobile.html`을 더블클릭해 브라우저로 열면 됩니다.
PC 브라우저에서 모바일 화면을 보려면 F12를 누른 뒤 휴대폰 아이콘(기기 모드)을 켜세요.

## GitHub Pages로 배포하기

1. GitHub에서 새 저장소를 만듭니다 (예: `lis-cardnews`, Public).
2. 이 폴더 안의 파일을 모두 저장소에 올립니다.
   - 웹에서: 저장소 화면의 **Add file → Upload files**에 폴더 내용을 끌어다 놓기
   - 또는 명령어:
     ```
     git init
     git add .
     git commit -m "카드뉴스 첫 배포"
     git branch -M main
     git remote add origin https://github.com/<계정>/lis-cardnews.git
     git push -u origin main
     ```
3. 저장소 **Settings → Pages**에서 Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 저장합니다.
4. 1~2분 뒤 `https://<계정>.github.io/lis-cardnews/` 주소로 열립니다.

### 배포 후 꼭 할 일

카카오톡 공유 썸네일이 나오려면 `index.html`과 `mobile.html`의 og:image를 전체 주소로 바꿔야 합니다.

```html
<meta property="og:image" content="https://<계정>.github.io/lis-cardnews/images/og.jpg">
```

카톡에 예전 미리보기가 남아 있으면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 초기화하세요.

## 그 밖의 수정

- **카드 추가·삭제**: `cards.js`의 `{ ... },` 덩어리를 추가하거나 지웁니다. 장 수와 번호는 자동으로 맞춰집니다. 목차 카드(2번)의 `to` 번호와 `assets.js`의 캐릭터 번호는 직접 고쳐야 합니다.
- **특정 카드 공유**: 주소 뒤에 `#14`처럼 번호를 붙이면 그 카드부터 열립니다.
- **PC 카드 글자가 넘칠 때**: PC 카드는 정사각형이라 문구가 길면 아래가 잘립니다. 문구를 줄이거나 카드를 나눠 주세요. 모바일 카드는 길면 위아래로 스크롤됩니다.

## 확인이 필요한 내용

- 공간 사진과 이름의 짝(10~14번 카드)
- 학과 행사·동아리 목록이 현재 학년도와 맞는지
- 장학금 수혜율(93.86%, 2025 정보공시 기준)
- 대구대 공식 전용색상 값
