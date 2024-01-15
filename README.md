# Mini Games

![Project ScreenShot0](https://firebasestorage.googleapis.com/v0/b/travelgo-6fa6a.appspot.com/o/Minigames%2FMinigame0.webp?alt=media&token=ef916d11-0883-45ae-9ddf-e5d294116630)

## Mini Games는?

MiniGames는 여러 미니게임을 제공하는 웹 애플리케이션으로, 다양한 알고리즘을 설계하여 프로그래밍 언어에 대한 이해와 문제해결 능력을 높이고자 하는 목표로 개발하였습니다.<br>

Wordle, 지뢰찾기, 오목 등 사용자의 행동에 반응하여 직접 상호작용하는 다양한 게임의 진행 흐름과 종료 조건을 React state를 이용하여 관리하였습니다. 또한 UX/UI 디자이너와 협업하여 비교적 정적인 게임에서의 몰입도를 향상시키기 위해 Lottie Player과 루프 애니메이션을 이용하여 동적인 요소들을 추가하였습니다.<br>

프로젝트에서 구현한 핵심 기능은 다양한 게임 로직, 루프 애니메이션 재생 입니다.<br>
<br>

## 배포 링크

[https://main--magenta-unicorn-80ac8f.netlify.app/](https://main--magenta-unicorn-80ac8f.netlify.app/)

<br>

## 기술 스택

- `Typescript`, `React`
- `Framer`, `Lottie Player`, `Animation`
- `Prettier`, `Netlify`

<br>

## 개발 기간

- 2023년 11월

<br>

## 기능 구현
### 깊이 우선 탐색(DFS)를 통한 지뢰찾기 알고리즘 구현<br>
![Project ScreenShot1](https://firebasestorage.googleapis.com/v0/b/travelgo-6fa6a.appspot.com/o/Minigames%2FMinigame5.webp?alt=media&token=3f3cfb75-5ca2-4587-ba9e-ea459e4b0908)

지뢰찾기 게임 중 빈 칸을 클릭했을 때 주변의 빈 칸들이 자동으로 펼쳐지는 기능을 구현하기 위해 재귀 함수를 활용한 깊이 우선 탐색(DFS) 알고리즘을 사용하였습니다.<br>

숫자나 지뢰가 없는 빈 칸을 찾아 재귀적으로 호출되며, 주변 모든 칸에 숫자가 나타날 때까지 탐색하는 findBlank() 함수를 이용하여 dFS 알고리즘을 구현하였습니다. 무한 루프를 방지하기 위해 함수의 매개변수에 이미 방문한 노드를 기록하는 history를 추가하여 이미 탐색된 칸인지 확인하였습니다.<br><br>


### 완전탐색을 통한 오목 승패 알고리즘 구현<br>
![Project ScreenShot3](https://firebasestorage.googleapis.com/v0/b/travelgo-6fa6a.appspot.com/o/Minigames%2FMinigame3.webp?alt=media&token=84080dee-641f-43cf-bff2-402d0b373795)

오목 게임의 승패 판정 로직을 구현하는 데 있어, 모든 칸에 고유한 좌표를 부여하는 방식을 사용하였습니다. 플레이어가 바둑알을 배치할 때마다 좌표를 이용하여 승패 여부를 판단합니다.<br>

승패 판정 로직을 효율적으로 구현하기 위해, 각 플레이어 별로 정보를 저장하는 방법이 아닌 오목판 전체의 상태를 하나로 통합하여 관리 하는 방법을 사용하였습니다. 이를 통해 승패를 판정하는 부분의 코드 실행 횟수를 절반으로 줄일 수 있었습니다.<br>

승패 여부는 완전탐색 방법을 사용하여 확인하였습니다. 가로와 세로 방향의 승패 여부는 이중 반복문을 통해 연속된 5칸이 같은 플레이어의 바둑돌인지 확인하였고, 대각선 방향의 승패 여부는 가로 좌표와 세로 좌표의 차이가 같은 돌을 모은 후, 이들 중 연속된 5칸이 같은 플레이어의 바둑돌인지 확인 하는 방법을 사용하여 모든 경우에 대한 승패 여부를 확인하였습니다.<br><br>


### Lottie Player와 루프 애니메이션을 활용한 게임의 동적 요소 구현<br>
![Project ScreenShot0](https://firebasestorage.googleapis.com/v0/b/travelgo-6fa6a.appspot.com/o/Minigames%2FMinigame0.webp?alt=media&token=ef916d11-0883-45ae-9ddf-e5d294116630)

상대적으로 정적인 미니게임 환경의 몰입도를 향상하기 위해 인터페이스에 동적인 요소를 추가했습니다. UX/UI 디자이너와의 협업을 통해 Lottie Player로 움직이는 SVG 이미지를 제작했으며, 이를 React 컴포넌트로 변환하여 게임 화면에 통합했습니다.
또한 루프 애니메이션을 구현하기 위해 Framer의 Animate Presence 컴포넌트를 활용했습니다. useEffect와 setInterval() 함수를 사용해 일정 주기마다 새로운 key를 가진 모션 컴포넌트를 렌더링 함으로써, 애니메이션이 끊임없이 이어지는 효과를 구현하였습니다.<br><br>


## 문제 해결
### 컴포넌트 구조 최적화를 통한 Wordle 성능 개선<br>
![Project ScreenShot2](https://firebasestorage.googleapis.com/v0/b/travelgo-6fa6a.appspot.com/o/Minigames%2FMinigame6.webp?alt=media&token=43568cfa-ed38-4151-afa9-2d49b322ad69)

Wordle은 숫자 야구 게임의 문자 버전으로 5글자의 단어를 추측하면 해당 단어의 각 글자마다 정답 여부를 제공합니다. 해당 기능을 구현하는 초기 단계에서, 한 글자씩 별도의 input 요소를 렌더링하는 방법을 사용하였습니다. 플레이어가 글자를 입력할 때마다 각각의 정답 여부를 체크하고, useRef의 focus()를 사용하여 커서를 자동으로 다음 Input으로 넘기어 게임의 자동화를 구현 하였습니다. 하지만 연속으로 글자를 빠르게 입력하는 경우 커서 이동에 지연이 발생하여 의도된 대로 동작하지 않는 문제가 있었습니다.<br>

문제의 원인은 useRef가 virtual DOM이 아닌 실제 DOM 요소에 직접적인 참조를 제공하기 때문이었습니다. 실제 DOM에 대한 업데이트가 빈번하게 일어나게 되면서, 대부분의 상호작용이 Virtual DOM을 통해 이루어지는 React 환경으로 구현된 프로그램의 성능 저하가 일어났습니다.<br>

저는 컴포넌트의 구조를 변경하는 방식으로 이 문제를 해결하였습니다. 먼저 각 줄 마다 보이지 않는 input 요소를 생성하였습니다. 사용자는 5글자를 모두 하나의 숨겨진 Input에 입력하게되고, 이를 한 글자씩 잘라 별도의 박스에 각각 렌더링 해주는 트릭을 사용했습니다. 이러한 컴포넌트 구조 변경을 통해 useRef의 실제 DOM 참조를 1/5로 줄이게 되었고, 성능 최적화를 통해 불필요한 로딩을 방지하여 사용자 경험을 개선하였습니다.<br><br>


### React State와 렌더링 원리의 이해를 통한 무한루프 문제 해결<br>

지뢰찾기 게임에서 빈 칸을 클릭했을 때 주변의 모든 빈 칸을 펼쳐주는 findBlank() 함수가 무한히 실행되는 현상이 발견되었습니다. 기존의 함수는 React state인 history를 사용해 이미 방문한 노드를 확인하도록 구현하였으나, 재귀 함수가 실행되는 과정에서 history가 업데이트 되지 않아 함수가 무한히 실행되었습니다.<br>

문제의 원인은 React state가 재귀적인 함수 실행 중간이 아닌 함수 실행이 종료된 후 업데이트 된다는 점에서 찾을 수 있었습니다. 이를 해결하기 위해, State를 이용하는 대신, 재귀 함수의 매개변수를 통해 현재까지 방문한 노드 정보를 관리하고 실시간으로 방문 정보를 업데이트 할 수 있도록 findBlank()의 구현을 변경하였습니다.<br>

문제의 원인을 파악하고 해결하는 과정을 통해 React의 기본이 되는 상태 관리와 컴포넌트 렌더링 메커니즘에 대한 더욱 깊은 이해를 할 수 있었습니다.<br>



