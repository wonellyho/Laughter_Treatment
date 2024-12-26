
// 귀여운 이미지 배열 생성
const cuteImages = [];
for (let i = 1; i <= 100; i++) {
    cuteImages.push(`assets/img/portfolio/cute_img/cute_img_${i}.jpg`); // 이미지 경로를 배열에 추가
}

// 모달이 열릴 때 랜덤 이미지 표시
document.getElementById('portfolioModal2').addEventListener('shown.bs.modal', function () {
    const randomIndex = Math.floor(Math.random() * cuteImages.length); // 랜덤 인덱스 생성
    const randomImage = cuteImages[randomIndex]; // 랜덤 이미지 선택

    // 이미지 태그의 src 속성 변경
    document.getElementById('randomCuteImage').src = randomImage;
});
