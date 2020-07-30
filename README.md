배포: Netlify
https://laughing-allen-f2ace5.netlify.app/tag/web-design

마크다운 이용
- 마크다운 파일을 하나의 포스팅으로 띄운다.
- 001-first-post.md
- 002-second-post.md
- 003-third-post.md

graphql
- 데이터 조회는 graphql로 원하는 형태로 가지고올 수 있다.
- 쿼리문 하나로 손쉽게 데이터 접근 가능

gatsby-cofing 추가
1. gatsby-plugin-sass => Scss 적용   
2. gatsby-plugin-catch-links => 링크 이동시 리로딩이 아니라 싱글페이지로 작동   
3. gatsby-transformer-remark 추가   

각 페이지 만들기 => gatsby-node.js
- createPages()로 만들어주고 맨 마지막에 context로 넘기는 변수(slug)는
- 각 페이지에서 query를 조회할때 $slug 형태로 받아 올 수 있다.
- 받아온 변수를 이용하여 각 페이지에 해당하는 데이터만 조회하여 뿌려준다.

댓글 서비스 [Disqus]
- npm install disqus-react
- 리액트랑 연동 됌
- https://disqus.com/profile/signup/intent/
