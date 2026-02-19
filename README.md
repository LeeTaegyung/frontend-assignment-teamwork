# 건설 도면 탐색 인터페이스 구축

## 실행 방법

```bash
npm install
npm run dev
```

## 기술 스택

- React
- Typescript
- React-dom
- Tailwindcss

## 구현 기능

### 필수

- [x] 도면 탐색
- [x] 도면 표시
- [x] 컨텍스트 인식

### 선택

> 시나리오를 바탕으로 정의한 문제들입니다.

- [x] 최신 현황 확인 - 최신 도면으로 이전 버전과 최신 버전의 변경 이력 확인
- [x] 공종 간 간섭 확인 - 변경점이 서로 충돌하지 않는지 설비 도면과 건축 도면 겹쳐서 확인
- [x] 변경 이력 추적 - REV1에서 REV3까지 변경점 추적하여 변경 방향 논의

## 미구현 기능

### 선택

- [ ] SVG pan + zoom 기능

## 폴더 구조

```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┣ 📂data
 ┣ 📂hooks
 ┣ 📂pages
 ┣ 📂styles
 ┗ 📂utils
```
