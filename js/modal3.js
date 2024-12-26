
// 웃긴 이미지 배열 생성 (fun_img_{index}.jpg 형식)
const funImages = [];
for (let i = 1; i <= 100; i++) {
    funImages.push(`assets/img/portfolio/fun_img/fun_img_${i}.jpg`); // 올바른 파일 이름에 맞게 수정
}

// 모달이 열릴 때 랜덤 이미지 표시
document.getElementById('portfolioModal3').addEventListener('shown.bs.modal', function () {
    const randomIndex = Math.floor(Math.random() * funImages.length); // 랜덤 인덱스 생성
    const randomImage = funImages[randomIndex]; // 랜덤 이미지 선택

    // 이미지 태그의 src 속성 변경
    document.getElementById('randomFunImage').src = randomImage;
});
