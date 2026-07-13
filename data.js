/* ==========================================================================
   Global RPM Day 좌석 배치도 - 데이터 & 레이아웃 상수
   ========================================================================== */

/* ---- 좌석 이름 데이터 (국문 시트 기준, A-O행 x 1-21열) ---- */
const SEATS_RAW = {
  A: ["위신","팽해군","진군렴","왕천","리빈","조몽기","마문학","김해룡","최동철","김경환(일)","최주현","전상목","제인","리츠","파울로","아메드","강올레그","크리스티나","예카테리나","예고르","예브게니"],
  B: ["당효동","황우능","리나","왕평평","당하","장재욱","황애령","김민호","신동우","윤성민","최춘화","최종규","마리츠","다이앤","막스","놀란","라지","안나","옥사나","콘스탄틴","블라디미르"],
  C: ["왕우명","리남성","라강림","곽홍량","양로","성종수","김경환(중)","오림호","신정호","신승윤","임채호","김창범","프라납","하르샤","프라하르샤","시타람","라비","아시시","난딥","아얀","리샤브"],
  D: ["리춘맹","왕안기","강위","장검명","고덕지","육수동","이한규","김재모","송재경","김은영","이지우","오세훈","전장웅","히로세","후지이","시티암","마헤시","니사르그","카부스","디비얀쉬","바탄"],
  E: ["정팅","황립홍","안드레스","대니엘","루세로","소피아","이경찬","최유민","강기훈","홍수정","신상현","강현규","니킬","에드가","보우차","마노즈","싯다르타","자예쉬","팟파신","끼앗싸꾼","투 탕"],
  F: ["알란","호라시오","한정묘","이준호","박지훈","이근협","이상호","정승식","정선태","CHO","신미영","최원호","김재승","신대석","이현수","권성현","이진솔","홍기성","손준걸","최영호","이범근"],
  G: ["양현승","최진원","김관홍","이정현","윤장호","이현웅","권태형","서남일","박지훈","라소담","이상윤","김소록","김희진","양상현","진병엽","양재석","윤영웅","임승규","최규완","안계명","안휘빈"],
  H: ["유현일","이태헌","배일근","채형진","조재은","최용준","김병석","장대성","이현주","정승종","마영준","김호영","최민주","김승준","김승래","신의균","박성수","정민영","박성호","정지영","한현택"],
  I: ["이종훈","조원준","전제석","강소라","김기봉","허정우","이승현","고희중","김대윤","박민호","이진오","임정민","이준희","강재석","김용준","정민교","정승완","오동현","김규보","박하림","박철우"],
  J: ["심후성","박시형","이찬","황정혜","김지원","김상리","정진상","서기홍","정향희","김현덕","안재오","이은경","최은주","이혜연","이대근","유명인","정용근","정대교","이선벽","윤영환","김종성"],
  K: ["박찬우","장훈","조도연","이의현","유상진","최승원","윤장호","박건태","장형상","김승준","이시암","최배성","홍정모","김선우","박상렬","이승민","김세훈","김민재","박예림","한수민","신상준"],
  L: ["변창언","김민섭","김건휘","한강섭","김용수","신형진","권정우","박경식","강승한","안태준","김준호","배상현","김종남","김동진","김태국","박준혁","하성우","배동민","임정현","박이준","이환규"],
  M: ["박영준","허영욱","신민우","김승수","손영민","서상준","박현재","장창현","상예찬","이수민","류지승","소정은","장재욱","이승진","이현민","박동근","황병훈","강희용","김효진","심은기","최승빈"],
  N: ["고종혁","김준우","윤재웅","김현규","도기봉","조해용","허문석","우성운","함성훈","서충원","이승훈","박찬석","문성혁","박재욱","하성열","김성진","양소희","이정우","전준언","박상우","유온유"],
  O: ["이준서","김정빈","김현","이환주","김희성","김민태","조성진","김동욱","김동규","신정윤","손가희","이지선","정미선","윤승훈","김제헌","민의진","송아리","김동현","조한정","한내경","황다원"]
};

const ROW_LETTERS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"];

/* ---- 영문 좌석명 (구글시트 국문탭 하단에 추가된 영문 표) ---- */
const SEATS_RAW_EN = {
  A: ["Yu Xin","Peng Haijun","Chen Junlian","Wang Tian","Li Bin","Cao Mengqi","Ma Wenxue","Jin Hailong","Choi Dongchul","Kim Kyunghwan(J)","Ryan Choi","Dainel Jeon","Jane Acosta","Ritz Montevrigen","Paulo Calidayan","Amed Lovendino","Oleg Kan","Kristina Pataraya","Ekaterina Solodova","Egor Desyatnikov","Evgeniy Yudintsev"],
  B: ["Tang Xiaodong","Huang Youneng","Li Na","Wang Pingping","Dang Xia","Zhang Ziyu","Huang Ailing","Jin Minhao","Shin Dongwoo","Yeun Seongmin","Chloe Choi","Nicholas Choi","Mariz Encomienda","Dianne Gutierrez","Max Lambampa","Norlan De Vera","Raji Garcia","Anna Odnokopylova","Oksana Panina","Konstantin Skorobagatko","Vladimir Lee"],
  C: ["Wang Youming","Li Nanxing","Luo Jianglin","Guo Hongliang","Yang Lu","Sung Jongsu","Kim Kyounghwan(C)","Wu Linhu","Shin Jungho","Shin Seungyun","Lim Chaeho","Edmond Kim","Pranav Vaishampayan","Harsha Tadavarthi","Praharsha Gade","Seetharam Tirupathimuhanthi","Naga Ravi Kiran Anne","Ashishi Loya","Nandeep Gohil","Ayan Srivastava","Rishav Prasad"],
  D: ["Li Chunmeng","Wang Anqi","Jiang Wei","Zhang Jianming","Gao Dezhi","Lu Shuaidong","Lee Hangyu","Kim Jaemo","Song Jaekyung","Kim Eunyeong","Yi Jiwoo","Oh Sehoon","Tian Changxiong","Hirose Eiju","Fujii Yuya","Satyam Jain","Mahesh Surla","Nisarg Shah","Qaboos Thakur","Divyansh Pandey","Vatan Sharma"],
  E: ["Zheng Ting","Huang Lihong","Andres Mauricio Lozano Briceno","Daniel Restrepo","Lucero Rivas","Sofia Pimiento Restrepo","Marshall Lee","Ralf Choi","David Kang","Crystal Hong","Leo Shin","Kyle Kang","Nikhil Batlanki","Edgar De Los Santos","Boucha Oussama","Manoj Kheterpal","Siddartha","Jayesh Darshane","Phatpasin Samprasit","Kiatsakul Khalasai","Nguyễn Từ Thắng"],
  F: ["Alan Alexis Rivas Acevedo","Horacio De Jesus Nangullasmu Hernandez","Ellie Han","Jason Lee","Louis Park","Axel Lee","Lee Sangho","Jeong Seungsig","Jeong Suntae","CHO","Shin Miyoung","Choi Wonho","Kim Jaeseung","Shin Daeseock","Vito Lee","Sunny Kwon","Lee Jinsol","Eddie Hong","Dennis Son","Choi Youngho","Win Lee"],
  G: ["Yang Hyunseung","Choi Jinwon","Kim Kwanhong","Lee Junghyun","Yoon Jangho","Lee Hyunwoong","Kwon Taehyung","Seo Namil","Park Jihun","Rha Sodam","Lee Sangyun","Kim Sorok","Kim Heejin","Yang Sanghyun","Jin Byungyup","Yang Jaeseok","Yoon Youngwoong","Lim Seungkyu","Choi Kyuwan","An Kyemyung","Ahn Hwibin"],
  H: ["You Hyunil","Lee Taeheon","Bae Ilgeun","Chae Hyungjin","Cho Jaeeun","Choi Yongjun","Kim Byungseok","Jang Daesung","Lee Hyunju","Jung Seungjong","Ma Youngjun","Kim Hoyeong","Choi Minju","Kim Seungjun","Kim Seungrae","Shin Euigyun","Park Seongsoo","Jeong Minyoung","Park Sungho","Jung Jiyoung","Hahn Hyuntaek"],
  I: ["Lee Jonghun","Cho Wonjun","Jeon Jeseok","Kang Sora","Kim Kibong","Heo Jeongu","Lee Seunghyun","Ko Heejung","Kim Daeyoon","Park Minho","Lee Jinoh","Lim Jeongmin","Lee Junhee","Kang Jaeseok","Kim Yongjoon","Jeong Minkyo","Jeong Seungwan","Oh Donghyun","Kim Gyubo","Park Harim","Park Chulwoo"],
  J: ["Sim Husung","Park Sihyong","Lee Chan","Hwang Junghye","Kim Jiwon","Kim Sangrin","Chung Jinsang","Seo Kihong","Jung Hyanghee","Kim Hyundeok","Ahn Jaeoh","Lee Eunkyung","Choi Eunju","Lee Hyeyeon","Lee Daekeun","Yoo Myungin","Jung Yonggeun","Jung Daegyo","Lee Seonbyeok","Yoon Younghwan","Kim Jongseong"],
  K: ["Park Chanwoo","Jang Hun","Cho Doyeon","Lee Uihyun","You Sangjin","Choi Seungwon","Yun Jangho","Park Kuntae","Jang Hyungsang","Kim Seungjun","Lee Siam","Choi Baisung","Hong Jeongmo","Kim Sunwoo","Park Sangryul","Lee Seungmin","Kim Sehoon","Kim Minjae","Park Yerim","Han Sumin","Shin Sangjun"],
  L: ["Byun Changeon","Kim Minseop","Kim Geonhwi","Han Kangsub","Kim Yongsu","Shin Hyeongjin","Kwon Jeongwoo","Park Kyungsik","Kang Seunghan","Ahn Taejun","Kim Junho","Bae Sanghyun","Kim Jongnam","Kim Dongjin","Kim Taegook","Park Junhyuk","Ha Sungwoo","Lee Jungwoo","Jeon Juneon","Park Yijun","Lee Hwangyu"],
  M: ["Park Youngjun","Hur Youngwook","Shin Minwoo","Kim Seungsu","Son Youngmin","Seo Sangjun","Park Hyunjae","Jang Changhyun","Sang Yechan","Lee Sumin","Ryu Jeeseung","So Jeongeun","Jang Jaeuk","Lee Seungjin","Lee Hyunmin","Park Donggeun","Hwang Byunghun","Kang Heeyong","Kim Hyojin","Sim Eungi","Choi Seungbin"],
  N: ["Ko Jonghyuk","Kim Joonwoo","Yun Jaewoong","Kim Hyeongyu","Do Kibong","Cho Haeyong","Huh Moonseok","Woo Sungwoon","Ham Sunghun","Seo Chungwon","Lee Seunghoon","Park Chanseok","Moon Seonghyeok","Park Jaewook","Ha Sungyoul","Kim Sungjin","Yang Sohee","Bae Dongmin","Lim Jeonghyeon","Park Sangwoo","Yoo Onyoo"],
  O: ["Lee Junseo","Kim Jungbin","Kim Hyun","Lee Hwanju","Kim Heesung","Kim Mintae","Jo Sungjin","Kim Dongwook","Kim Dongkyu","Shin Jeongyoon","Sohn Gahee","Lee Jisun","Jung Misun","Yoon Seunghoon","Kim Jeheon","Min Uijin","Song Ari","Kim Donghyun","Cho Hanjung","Han Naekyung","Hwang Dawon"]
};

/* 확대(pinch-zoom) 시 CSS transform이 저해상도 래스터를 그대로 늘려서 텍스트가
   뭉개지는 문제를 막기 위해, 좌석/글자 자체를 실제로 크게(2.5배) 그린다.
   (이전의 "3배로 그린 뒤 정적으로 축소" 방식은 브라우저가 두 transform을
   하나로 합쳐버려 효과가 없었음 - 이제는 그냥 처음부터 크게 그리고, 줌 배율
   상한을 낮춰서 원본 해상도 대비 과도한 확대가 일어나지 않도록 한다) */
const SCALE_FACTOR = 2.5;
const F = SCALE_FACTOR;

/* 좌석 박스를 정사각형 대신 "가로로 긴 직사각형"으로 만들기 위한 가로 확대 배율.
   가로 방향의 모든 좌표/치수(좌석 폭, 열 간격, 무대/기둥 위치, 캔버스 폭)를 동일하게
   XSTRETCH배 늘리면, 세로(높이/행 간격)는 그대로라 배치 충돌 없이 박스만 옆으로 길어진다. */
const XSTRETCH = 1.4;

/* ---- 레이아웃 상수 (Figma 디자인 node 34:2 좌표 기준 비율 유지, px 단위 * F) ---- */
const LAYOUT = {
  seatW: 32 * F * XSTRETCH,   // 가로 확대된 좌석 폭 (직사각형)
  seatH: 32 * F,              // 좌석 높이 (원본 유지)
  gapSeatX: 2 * F * XSTRETCH, // 같은 그룹 내 열 간격(가로)
  gapSeatY: 2 * F,            // 행 간격(세로)
  gapGroup: 10 * F * XSTRETCH,
  gapAisle: 40 * F * XSTRETCH,
  xStart: 74 * F * XSTRETCH,
  stage: { x: 74 * F * XSTRETCH, y: 46 * F, w: 758 * F * XSTRETCH, h: 40 * F },
  colHeaderY: 99 * F,
  rowLabelW: 28 * F * XSTRETCH,
  block1: { rows: ["A","B","C","D","E","F","G","H","I"], yStart: 136 * F, colGroups: [6, 6, 9] },
  block2: { rows: ["J","K","L","M","N","O"], yStart: 480 * F, colGroups: [6, 9, 6] },
  markerX: 862 * F * XSTRETCH,
  markerW: 50 * F * XSTRETCH,
  markers: [
    { type: "pillar", y: 170 * F, h: 32 * F },
    { type: "door",   y: 238 * F, h: 100 * F },
    { type: "pillar", y: 340 * F, h: 32 * F },
    { type: "door",   y: 514 * F, h: 134 * F }
  ],
  canvasW: 940 * F * XSTRETCH,
  canvasH: 700 * F,
  radius: 4 * F,
  fontSize: {
    stage: 16 * F,
    label: 13 * F,
    marker: 10 * F,
    seat: 8 * F,   // 6.5px 원안보다 살짝 키움 (가독성)
    // 영문 이름(2단어 이상)은 국문보다 훨씬 길어서 같은 크기로는 줄바꿈이
    // 심해진다. 박스 폭을 넓히는 것만으로는(아래 seatWidenExtraEn 참고)
    // 한계가 있어 폰트도 함께 줄여 2줄 이상 줄바꿈을 최대한 줄인다.
    seatEn: 6 * F
  },
  /* 영문 모드에서 이름 줄바꿈을 더 줄이기 위해 좌석 박스를 가로로 추가로 살짝 늘림.
     늘어난 폭만큼 좌우로 반씩 확장되면 양옆 좌석과의 간격이 "extra"만큼 줄어든다.
     겹치지 않도록 extra < gapSeatX 로 제한(약간의 여유 간격 유지). */
  seatWidenExtraEn: 1.8 * F
};

/* 열 그룹/간격으로부터 각 열의 x좌표 배열을 계산 */
function buildColXs(groupSizes, gaps) {
  const xs = [];
  let x = LAYOUT.xStart;
  for (let g = 0; g < groupSizes.length; g++) {
    for (let c = 0; c < groupSizes[g]; c++) {
      xs.push(x);
      x += LAYOUT.seatW + LAYOUT.gapSeatX;
    }
    if (g < groupSizes.length - 1) {
      x = x - LAYOUT.gapSeatX + gaps[g];
    }
  }
  return xs;
}

/* 전체 좌석 목록 생성: [{id, row, col, name, x, y}] */
function buildSeats() {
  const seats = [];
  const gaps = [LAYOUT.gapGroup, LAYOUT.gapAisle];

  [LAYOUT.block1, LAYOUT.block2].forEach((block) => {
    const colXs = buildColXs(block.colGroups, gaps);
    block.rows.forEach((rowLetter, rowIdx) => {
      const y = block.yStart + rowIdx * (LAYOUT.seatH + LAYOUT.gapSeatY);
      const names = SEATS_RAW[rowLetter];
      const namesEn = SEATS_RAW_EN[rowLetter] || [];
      colXs.forEach((x, colIdx) => {
        const col = colIdx + 1;
        seats.push({
          id: `${rowLetter}${col}`,
          row: rowLetter,
          col,
          name: names[colIdx] || "",
          nameEn: namesEn[colIdx] || "",
          x, y
        });
      });
    });
  });
  return seats;
}

const SEATS = buildSeats();

/* 표시용 이름: 영문 모드인데 영문 데이터가 아직 없으면 국문으로 대체 표시 */
function seatDisplayName(seat, lang) {
  if (lang === "en" && seat.nameEn) return seat.nameEn;
  return seat.name;
}

/* 행 라벨(A-O) y좌표 (텍스트 중심 기준) */
function buildRowLabels() {
  const labels = [];
  [LAYOUT.block1, LAYOUT.block2].forEach((block) => {
    block.rows.forEach((rowLetter, rowIdx) => {
      const y = block.yStart + rowIdx * (LAYOUT.seatH + LAYOUT.gapSeatY) + LAYOUT.seatH / 2;
      labels.push({ row: rowLetter, y });
    });
  });
  return labels;
}
const ROW_LABELS = buildRowLabels();

/* 열 헤더(1-21) - block1과 block2는 실제 열 그룹 순서가 달라서(6,6,9 vs 6,9,6)
   좌석 자체의 x좌표는 서로 다르지만, 헷갈리지 않도록 헤더에 표시되는 숫자
   1~21의 위치는 맨 위(block1) 기준 x좌표로 두 블록 모두 통일한다. */
const HEADER_OFFSET_Y = LAYOUT.block1.yStart - LAYOUT.colHeaderY; // 37
const HEADER_XS = buildColXs(LAYOUT.block1.colGroups, [LAYOUT.gapGroup, LAYOUT.gapAisle]);
const BLOCK_COL_HEADERS = [LAYOUT.block1, LAYOUT.block2].map((block) => {
  return {
    y: block.yStart - HEADER_OFFSET_Y,
    cols: HEADER_XS.map((x, i) => ({ x, label: String(i + 1) }))
  };
});

/* ---- 다국어(i18n) 문자열 ---- */
const I18N = {
  ko: {
    code: "KO", name: "한국어",
    appTitle: "2026 GLOBAL RPM DAY 좌석배치도",
    searchPlaceholder: "이름으로 좌석 검색",
    overview: "전체보기",
    noResults: "검색 결과가 없습니다",
    pillar: "기둥",
    door: "출입문",
    resultsCount: (n) => `검색 결과 ${n}건`,
    startTeamBtn: "팀 위치 보기",
    startSearchBtn: "이름 검색",
    teamModalTitle: "팀 선택",
    back: "뒤로",
    noTeamSeats: "표시할 좌석 정보가 없습니다"
  },
  en: {
    code: "EN", name: "English",
    appTitle: "2026 GLOBAL RPM DAY Seating Chart",
    searchPlaceholder: "Search seat by name",
    overview: "View All",
    noResults: "No results found",
    pillar: "Pillar",
    door: "Entrance",
    resultsCount: (n) => `${n} result(s)`,
    startTeamBtn: "View Team Location",
    startSearchBtn: "Search by Name",
    teamModalTitle: "Select Team",
    back: "Back",
    noTeamSeats: "No seat data available"
  },
};

const LANG_ORDER = ["ko", "en"];

/* ---- 팀(소속) 데이터 ----
   국내 실/팀/TF 23개는 사용자 제공 구글시트("이름/소속팀 정리", 2026-07-13)를 기준으로
   재구성했다. 시트는 국내 인원의 최신 소속을 담고 있어 국내팀에 대해서는 시트를 우선한다.
   시트에 없는 해외법인 8개(유럽/필리핀/호주/북미/남미/일본/러시아/인도)는 기존 데이터를 유지한다.
   시트에 없지만 좌석이 있고 기존 팀에 배정돼 있던 인원(ENR TF 강기훈·에드가·니킬, 유럽사업팀
   이현수, 아시아사업팀 이범근)은 팀을 잃지 않도록 그대로 유지했다.
   신규 팀 영문명(RPM추진실 등 8개)은 시트에 영문이 없어 합리적으로 새로 붙였다(추후 확정 필요). */
const TEAMS_RAW = [
  { ko: "ENR TF", en: "ENR TF", members: ["강현규","신상현","이경찬","최유민","홍수정","강기훈","에드가","니킬"] },
  { ko: "유럽사업팀", en: "Europe BIZ Team", members: ["양재석","진병엽","양상현","김희진","이현수"] },
  { ko: "아시아사업팀", en: "Asia BIZ Team", members: ["홍기성","손준걸","최영호","윤영웅","임승규","최규완","안계명","박철우","박성수","안휘빈","한현택","박성호","정지영","정민영","정승완","오동현","김규보","박하림","이범근","팟파신","끼앗싸꾼","투 탕"] },
  { ko: "남부사업TF", en: "Southern BIZ TF", members: ["이승민","정용근","유명인","김세훈"] },
  { ko: "기계사업팀", en: "Mechanical BIZ Team", members: ["윤영환","김종성","신상준","한수민","이환규","박이준","심은기","최승빈","박상우"] },
  { ko: "지반사업팀", en: "Geotechnical BIZ Team", members: ["강소라","전제석","조원준","최용준","이종훈","조재은","배일근","채형진","유현일"] },
  { ko: "구조사업팀", en: "Structural BIZ Team", members: ["정대교","이정우","전준언","김효진","강희용","이선벽","배동민","박준혁","임정현","김민재","박예림"] },
  { ko: "건축사업팀", en: "Architecture BIZ Team", members: ["신의균","강재석","이준희","정민교","이환주","김용준","최민주","H14","김승래"] },
  { ko: "설계개발팀", en: "Design DEV Team", members: ["이은경","안재오","K10","이시암","최배성","김현덕","안태준","이승훈","홍정모","김종남","배상현","김준호","박찬석","문성혁","류지승","소정은","장재욱"] },
  { ko: "엔솔개발팀", en: "EnSol DEV Team", members: ["박현재","정진상","허문석","우성운","함성훈","서기홍","윤장호","권정우","장형상","정향희","박경식","강승한","박건태","장창현","상예찬","이수민","서충원"] },
  { ko: "기술기획팀", en: "Technical Planning Team", members: ["이혜연","이대근","김동진","김선우","김태국","박상렬","하성열","이승진","이현민","박재욱","최은주"] },
  { ko: "MAX TF", en: "MAX TF", members: ["신대석","심후성","박시형","장훈","박영준","허영욱","김현","김민섭","김정빈","변창언","윤재웅","박찬우","고종혁","김준우","이준서"] },
  { ko: "모티브개발팀", en: "MOTIIV DEV Team", members: ["김용수","도기봉","손영민","조해용","서상준","김지원","김상리","유상진","최승원","신형진"] },
  { ko: "웹서비스개발팀", en: "Web Services DEV Team", members: ["이의현","조도연","신민우","김현규","황정혜","이찬","김건휘","한강섭","김승수"] },
  { ko: "온사이트개발팀", en: "On-site DEV Team", members: ["하성우","이태헌","박동근","양현승","최진원","김관홍","이정현","황병훈","윤장호","이현웅"] },
  { ko: "RPM추진실", en: "RPM Office", members: ["김재승","김제헌","김동현","윤승훈","정미선","조성진","김민태","한내경","김희성","조한정","이지선","손가희","민의진","신정윤","송아리","유온유","황다원","김동규","김동욱"] },
  { ko: "신사옥추진실", en: "New HQ Office", members: ["정선태","김기봉"] },
  { ko: "자인기획실", en: "Zine Planning Office", members: ["최원호","이상윤","라소담"] },
  { ko: "ExD팀", en: "ExD Team", members: ["김성진","양소희"] },
  { ko: "행복인재팀", en: "People & Culture Team", members: ["김소록","김호영","정승종","이진오","임정민","마영준"] },
  { ko: "경영전략실", en: "Management Strategy Office", members: ["신미영","고희중","김대윤","이승현","박민호","허정우"] },
  { ko: "SK추진실", en: "SK Office", members: ["이상호","서남일","권태형","G9"] },
  { ko: "SK상전실", en: "SK Operations Office", members: ["김병석","장대성","이현주"] },
  { ko: "중국법인", en: "China Branch", members: ["위신","팽해군","진군렴","왕천","리빈","조몽기","마문학","김해룡","당효동","황우능","리나","왕평평","당하","황애령","김민호","왕우명","리남성","라강림","곽홍량","양로","성종수","김경환(중)","오림호","리춘맹","왕안기","강위","장검명","고덕지","육수동","정팅","황립홍","정승식"] },
  { ko: "유럽법인", en: "Europe Branch", members: ["Sunny","진","마노즈","부샤","로히트","보우차","이진솔","권성현"] },
  { ko: "필리핀법인", en: "Philippines Branch", members: ["전상목","최주현","제인","아메드","파울로","리츠","마리츠","막스","다이앤","놀란","라지"] },
  { ko: "호주법인", en: "Australia Branch", members: ["김창범","하르샤","최종규","프라납","최춘화"] },
  { ko: "북미법인", en: "North America Branch", members: ["이준호","F5","한정묘"] },
  { ko: "남미법인", en: "South America Branch", members: ["이근협","알란","호라시오","소피아","안드레스","대니엘","루세로"] },
  { ko: "일본법인", en: "Japan Branch", members: ["신정호","윤성민","김재모","송재경","최동철","전장웅","김경환(일)","히로세","신승윤","임채호","김은영","신동우","이한규","오세훈","후지이","이지우"] },
  { ko: "러시아법인", en: "Russia Branch", members: ["강올레그","콘스탄틴","예고르","크리스티나","블라디미르","예카테리나","예브게니","안나","막심","옥사나"] },
  { ko: "인도법인", en: "India Branch", members: ["라비","아시시","난딥","아얀","리샤브","싯다르타","자예쉬","프라하르샤","시타람","바탄","마헤시","니사르그","시티암","카부스","디비얀쉬"] }
];

/* 좌석명 -> {row,col,id} 역인덱스 (실제 시트에 존재하는 사람만 팀 뷰에 노출) */
function buildTeams() {
  const seatByName = {};
  const seatById = {};
  SEATS.forEach((s) => {
    seatById[s.id] = s;
    if (!s.name) return;
    (seatByName[s.name] = seatByName[s.name] || []).push(s.id);
  });

  // 동명이인을 특정 좌석으로 지정할 때는 이름 대신 좌석 id(예: "F5")를 members에
  // 넣는다. 좌석 id 패턴(행 A-O + 열 숫자)이면 그 좌석만, 아니면 이름으로 매칭.
  const isSeatId = (m) => /^[A-O]\d{1,2}$/.test(m) && seatById[m];

  return TEAMS_RAW.map((t, idx) => {
    const seatIds = [];
    t.members.forEach((member) => {
      if (isSeatId(member)) {
        seatIds.push(member);
        return;
      }
      const ids = seatByName[member];
      if (ids) ids.forEach((id) => seatIds.push(id));
    });
    return {
      key: "team-" + idx,
      ko: t.ko,
      en: t.en,
      seatIds
    };
  }).filter((t) => t.seatIds.length > 0);
}

const TEAMS = buildTeams();
