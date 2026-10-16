/*
 * ===============================================================
 *  사진·캐릭터 주소 설정 파일
 *  - 여기의 주소만 바꾸면 PC 버전과 모바일 버전에 함께 반영됩니다.
 *  - 주소는 두 가지 방식 모두 됩니다.
 *      1) 폴더 안 파일 : 'images/lab.jpg'
 *      2) 인터넷 주소  : 'https://example.com/photo.jpg'
 *  - 따옴표(' ')는 지우지 마세요. 줄 끝의 쉼표(,)도 그대로 두세요.
 * ===============================================================
 */
window.ASSETS = {

  /* ---------- 공간 사진 ----------
   * src : 사진 주소
   * alt : 사진 설명 (화면에는 안 보이고, 시각장애인용 읽어주기에 쓰입니다)
   * 사진을 바꾸면 alt도 그 사진에 맞게 고쳐 주세요.
   */
  photos: {
    majorRoom: { src: 'images/major-classroom.jpg', alt: '초록색 의자와 책상이 줄지어 놓인 전공강의실' },       // 10 전공강의실
    lab:       { src: 'images/lab.jpg',             alt: '모니터와 키보드가 한 자리씩 놓인 전공강의실' },       // 11 전공강의실 (컴퓨터)
    seminar1:  { src: 'images/seminar.jpg',         alt: '긴 흰색 테이블과 화이트보드, 책장이 있는 세미나실' },  // 12 세미나실 (왼쪽)
    seminar2:  { src: 'images/dept-room.jpg',       alt: '나무 책장과 테이블이 있는 아늑한 학과 공간' },         // 12 세미나실 (오른쪽)
    study1:    { src: 'images/studyroom.jpg',       alt: '유리벽으로 나뉜 여러 개의 스터디룸' },                 // 13 스터디룸 (왼쪽)
    study2:    { src: 'images/study-area.jpg',      alt: '긴 책상과 의자가 놓인 넓은 학습 공간' },               // 13 스터디룸 (오른쪽)
    lounge1:   { src: 'images/lounge-2.jpg',        alt: '소파와 원목 테이블, 책장이 있는 라운지' },             // 14 라운지 (큰 사진)
    lounge2:   { src: 'images/lounge-3.jpg',        alt: '높은 테이블과 의자가 놓인 밝은 라운지' },             // 14 라운지 (오른쪽 위)
    lounge3:   { src: 'images/rest-area.jpg',       alt: '테이블이 여러 개 놓인 넓은 휴게 공간' }               // 14 라운지 (오른쪽 아래)
  },

  /* ---------- 카드별 캐릭터 ----------
   * 왼쪽 번호 = 카드 번호. 오른쪽 = 캐릭터 그림 주소.
   * 캐릭터를 빼고 싶은 카드는 '' (빈 따옴표)로 두세요.
   * 두두 포즈 29종: images/dodu/dodu-01.png ~ dodu-29.png
   *   01 기본  02 가리키기  03 손 흔들기  04 만세  05 엄지척  06 옆 가리키기  07 깃발
   *   08·09 날기  10 야구  11 안내판  12 졸업  13 노트북  14 시무룩  15 하품
   *   16 놀람  17 박수  18 생일  19 궁금  20 입학 축하  21 DU FESTIVAL  22 깜짝
   *   23 궁금(2)  24 축하  25 하트  26 건배  27 저요!  28 하트 안기  29 배고픔
   * 문헌정보학과 캐릭터: images/characters/lis.png
   */
  characters: {
    '01': 'images/characters/lis.png',   // 학과 소개
    '02': 'images/dodu/dodu-19.png',     // 목차
    '03': 'images/dodu/dodu-23.png',     // 어떤 학문?
    '04': 'images/dodu/dodu-05.png',     // 잘 맞아요
    '05': 'images/dodu/dodu-02.png',     // 6개 트랙
    '06': 'images/dodu/dodu-13.png',     // 1·2학년 교육과정
    '07': 'images/dodu/dodu-27.png',     // 3·4학년 교육과정
    '08': 'images/characters/lis.png',   // 수업 미리 살펴보기
    '09': 'images/dodu/dodu-04.png',     // 과제
    '10': '',                            // 전공강의실
    '11': '',                            // 전공강의실 (컴퓨터)
    '12': '',                            // 세미나실
    '13': '',                            // 스터디룸
    '14': '',                            // 라운지
    '15': 'images/dodu/dodu-21.png',     // 1년 행사
    '16': 'images/dodu/dodu-07.png',     // 수업 밖 학과생활
    '17': 'images/dodu/dodu-12.png',     // 국가자격증
    '18': 'images/dodu/dodu-09.png',     // 진로
    '19': 'images/dodu/dodu-22.png',     // 자주 묻는 질문
    '20': 'images/dodu/dodu-17.png'      // 응원
  },

  /* 맨 위 '어서와~ 문헌정보학과는 처음이지?' 제목 옆 캐릭터 (모바일은 첫 화면) */
  intro: 'images/dodu/dodu-03.png'
};
