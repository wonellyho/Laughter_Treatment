
// JSON 파일에서 아재개그 불러와 랜덤 표시
async function loadRandomJoke() {
    try {
        const response = await fetch("assets/jokes.json"); // JSON 파일 불러오기
        const jokes = await response.json(); // JSON 데이터 파싱
        const randomIndex = Math.floor(Math.random() * jokes.length); // 랜덤 인덱스
        const joke = jokes[randomIndex]; // 랜덤 아재개그 가져오기

        // 모달에 질문과 답 표시
        document.getElementById("jokeQuestion").innerText = joke.question;
        document.getElementById("jokeAnswer").innerText = joke.answer;
    } catch (error) {
        console.error("아재개그를 불러오는 중 오류 발생:", error);
    }
}

// Bootstrap 모달 이벤트 리스너 사용
document.getElementById('portfolioModal1').addEventListener('shown.bs.modal', function () {
    loadRandomJoke(); // 모달이 열릴 때 아재개그 불러오기
});
