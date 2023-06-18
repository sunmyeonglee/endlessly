let images = []; // 사진들을 저장할 배열
let currentImageIndex = 0; // 현재 보여지는 사진 인덱스

function preload() {
  // 사용할 사진들을 preload() 함수에서 미리 로드합니다.
  images.push(loadImage("./src/image1.png"));
  images.push(loadImage("./src/image2.png"));
  images.push(loadImage("./src/image3.png"));
  images.push(loadImage("./src/image4.png"));
  images.push(loadImage("./src/image5.png"));
  images.push(loadImage("./src/image6.png"));
  images.push(loadImage("./src/image7.png"));
}

function setup() {
  createCanvas(windowWidth - 15, windowHeight);
  fitCanvasToImage(images[currentImageIndex]); // 현재 사진에 맞게 캔버스 크기 조정
  startTimer(); // 타이머 시작
}

function draw() {
  // 현재 보여지는 사진을 캔버스에 그립니다.
  image(images[currentImageIndex], 0, 0, width, height);
}

function fitCanvasToImage(image) {
  // 캔버스 크기를 현재 사진에 맞게 조정합니다. 비율 유지됩니다.
  let imageAspectRatio = image.width / image.height;
  let canvasAspectRatio = width / height;

  if (imageAspectRatio > canvasAspectRatio) {
    resizeCanvas(width, width / imageAspectRatio);
  } else {
    resizeCanvas(height * imageAspectRatio, height);
  }
}

function startTimer() {
  // 3초마다 다음 사진으로 자동으로 넘어가는 타이머 시작
  timer = setTimeout(nextImage, 1000);
}

function stopTimer() {
  // 타이머 정지
  clearTimeout(timer);
}

function nextImage() {
  // 다음 사진으로 넘어가는 함수
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 1;
  }
  fitCanvasToImage(images[currentImageIndex]);
  startTimer(); // 타이머 재시작
}

function mouseClicked() {
  // 특정 부분을 클릭하면 다음 사진으로 변경합니다.
  let x = mouseX;
  let y = mouseY;

  // 클릭한 좌표가 특정 영역에 속하는지 확인합니다.
  if (x > width / 6 && x < width / 4.5 && y > height / 5 && y < height / 2) {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 1;
    }
    fitCanvasToImage(images[currentImageIndex]);
  }
}
