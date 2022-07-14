// step 1 회고
// 1. 이벤트 위임을 어떻게 할 수 있는지 알게 됨
// 2. 요구사항을 전략적으로 어떻게 접근해야하는지, (단계별로 세세하게 나누는게 중요
// 3. DOM 요소를 가져올때는 $표시를 써서 변수처럼 사용할 수 있음
// 4. 새롭게 알게 된 메서드: innerText, innerHTML, insertAdjacentHtml, closest, e.target

// step1 요구사항 구현을 위한 전략
// 요구사항의 의존성이 있을 수 있음
// 바로 개발 X 요구사항 먼저 체크, 
// 요구사항 한문장에 구현할 것이 2개 이상 있을 때 쪼개기
// 개발 전 계획 필수 -> 어디서 헤메는지 알 수 있음

// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.


// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
// - [x] 모달창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [x] 확인 버튼을클릭하면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.


// step 2 회고
// - 상태값의 중요성
// - step 1하고 step 2 하는데 상태 값을 사용해서 사용자 관점에서
//   페이지 렌더링될 때 어떻게 렌더링 되는지 알게 됨
// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장한다.
// - [x] localStorage에 있는 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - [x] 에스프레소 메뉴판 관리
// - [x] 프라푸치노 메뉴판 관리
// - [x] 블렌디드 메뉴판 관리
// - [x] 티바나 메뉴판 관리
// - [x] 디저트  메뉴판 관리

// TODO 페이지 접근 시 최초 데이터 Read & Rendering
// - [x] 페이지에 최초로 로딩될 때 localStorage에 에스프레소 메뉴를읽어온다.
// - [x] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [x] 품절 버튼을 추가한다.
// - [x] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [x] 클릭 이벤트에서 가장  가까운 li태그의 class속성 값에 sold-out을 추가한다.

// step 3 회고, 내가 혼자 짤 때의 전략
// 1. 웹서버 연동
// 2. BASE_URL 변수명 먼저 선언
// 3. 비동기 처리하는데 해당하는 부분이 어디인지 확인하고, 웹서버에 요청하게끔 코드 짜기
// 4. 서버에 요청한 후 데이터를 받아서 화면에 렌더링 하기
// 5. 리팩터링
//    - localStorage 부분 지우기
//    - API 파일 따로 만들어서 진행
//    - 페이지 렌더링과 관련해서 중복되는 부분들 제거
//    - 서버 요청할 때 option 객체
//    - 카테고리 버튼 클릭 시 콜백함수 분리
// 6. 사용자 경험 부분
// 

// TODO 서버 요청 부분
// - [x] 웹 서버를 띄운다.
// - [x] 서버에 새로운 메뉴명이 추가될 수 있도록 요청한다.
// - [x] 서버에 카테고리별 메뉴명리스트를 불러온다.
// - [x] 서버에 메뉴가 수정될 수 있도록 요청한다.
// - [x] 서버에 메뉴의 품절 상태가 토글될 수 있도록 요청한다.
// - [x] 서버에 메뉴가 삭제될 수 있도록 요청한다.

// - TODO 리팩터링 부분
// - [x] localStorage에 저장하는 로직은 지운다.
// - [x] fetch 비동기 api를 사용하는 부분을  async await을 사용하여 구현한다.

// TODO 사용자 경험
// - [x] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외 처리를 진행한다.
// - [x] 중복되는 메뉴는 추가할 수 없다.

import { $ }  from "./utils/dom.js";
import MenuApi from "./api/index.js";

function App() {
  // 상태 - 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 개수, 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: []
  };
  this.currentCategory = 'espresso';

  this.init = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(this.currentCategory);
    render();
    initEventListeners();
  }

  const render = async () => {
    this.menu[this.currentCategory] = 
      await MenuApi.getAllMenuByCategory(this.currentCategory);

    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
      return `<li data-menu-id="${menuItem.id}" class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
                <button
                  type="button"
                  class="${menuItem.isSoldOut ? "sold-out" : ""} bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                  품절
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                  수정
                </button>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                  삭제
                </button>
              </li>`;
    }).join("");
    $("#menu-list").innerHTML = template;
    updateMenuCount();
  }

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = async () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요");
      return;
    }
    const duplicatedItem = this.menu[this.currentCategory]
      .find(menuItem => menuItem.name === $("#menu-name").value);
    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#menu-name").value = "";
      return;
    }
    
    const menuName = $("#menu-name").value;
    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $("#menu-name").value = "";
  }

  const updateMenuName = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName,  menuId);
    render();
  }

  const removeMenuName = async (e) => {
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말 삭제하시겠습니까?")) {
        const menuId = e.target.closest("li").dataset.menuId;
        await MenuApi.deleteMenu(this.currentCategory, menuId);
        render();
      }
    }
  }

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);
    render();
  }

  const changeCategory = (e) => {
    const isCategoryButton = 
      e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      render();
    }
  }

  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }
  
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
  
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });
  
    $("#menu-form").addEventListener("submit", (e)  => {
      e.preventDefault();
    });
  
    
  
    $("#menu-submit-button").addEventListener("click", addMenuName);
    
    $("#menu-name").addEventListener("keypress", (e) =>  {
      if (e.key !== "Enter") {
        return;
      }
      addMenuName();
    });
  
    $("nav").addEventListener("click", changeCategory);
  }
}

const app = new App();
app.init();



