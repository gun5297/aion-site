export type Lang = 'ja' | 'ko';

export interface NewsItem {
  /** ISO date (YYYY-MM-DD); displayed as YYYY.MM.DD */
  date: string;
  category: string;
  title: string;
}

export interface ProfileRow {
  term: string;
  /** null = not yet provided; rendered as a visible placeholder. */
  value: string | string[] | null;
}

export interface Card {
  title: string;
  body: string;
  /** Flow step number(s) this area covers, shown as "STEP 03–04" */
  steps: string;
  /** Base name in /public/images; served as <name>-800.webp and <name>-1600.webp */
  image: string;
  alt: string;
}

export interface Section {
  /** English label shown above the localized heading */
  label: string;
  heading: string;
}

export interface Content {
  htmlLang: string;
  path: string;
  meta: { title: string; description: string };
  skip: string;
  nav: { news: string; about: string; message: string; business: string; flow: string; company: string; access: string; label: string; open: string; close: string };
  langSwitch: { label: string };
  hero: { title: string[]; en: string; alt: string };
  /** Section is rendered only while `items` is non-empty. Newest first. */
  news: Section & { items: NewsItem[] };
  about: Section & { statement: string; body: string; alt: string };
  /** Joint message from both representative directors. */
  message: Section & { title: string; paragraphs: string[]; company: string; signers: string[] };
  business: Section & { intro: string; items: Card[] };
  flow: Section & { intro: string; step: string; stages: { title: string; body: string }[] };
  values: Section & { items: { title: string; body: string }[] };
  company: Section & { placeholder: string; rows: ProfileRow[] };
  /** Walking times: route distance (OSM foot routing) at the 80 m/min real-estate standard, rounded up. */
  access: Section & { address: string; stations: string[]; mapTitle: string; openMap: string; newTab: string };
  footer: { name: string; address: string; pageTop: string; sitemap: string };
}

/** Language-neutral query for the map embed and link. */
export const mapQuery = '大阪府大阪市浪速区大国2-5-11';

// Registry facts (履歴事項全部証明書), shared by the profile, message signature, access and footer.
const jaName = '株式会社Aion';
const jaAddress = '〒556-0014 大阪府大阪市浪速区大国2-5-11-901';
const jaReps = ['代表取締役　中村 真理佳', '代表取締役　藤田 真優'];
const koName = '주식회사 Aion';
const koAddress = '〒556-0014 일본 오사카부 오사카시 나니와구 다이코쿠 2-5-11-901';
const koReps = ['대표이사 中村 真理佳', '대표이사 藤田 真優'];

const ja: Content = {
  htmlLang: 'ja',
  path: '/',
  meta: {
    title: jaName,
    description:
      '株式会社Aionは、営業・マーケティングの運用から売上の集計・照合、精算準備までを一貫して管理し、収益を正確でたどれる状態に整えます。',
  },
  skip: '本文へ移動',
  nav: {
    news: 'お知らせ',
    about: '私たちについて',
    message: '代表メッセージ',
    business: '事業内容',
    flow: '業務の流れ',
    company: '会社概要',
    access: 'アクセス',
    label: 'メインメニュー',
    open: 'メニューを開く',
    close: 'メニューを閉じる',
  },
  langSwitch: { label: '言語の切り替え' },
  hero: {
    title: ['流れを整え、', '数字を確かにする。'],
    en: 'Organize the flow. Make every number certain.',
    alt: '大阪・梅田のオフィス街',
  },
  news: {
    label: 'NEWS',
    heading: 'お知らせ',
    // No news for now; add items (newest first) to show the section and its footer link again.
    items: [],
  },
  about: {
    label: 'ABOUT',
    heading: '私たちについて',
    statement: '売上は、生まれた瞬間には\nまだ確定していません。',
    body: '集計の漏れ、データの食い違い、締め日のずれ。Aionは、こうした不確かさを一つずつ取り除き、次の工程へそのまま渡せる数字に整えます。営業・マーケティングの運用から精算の準備までを一つの流れとして管理することで、どの数字にも理由がある状態をつくります。',
    alt: 'イチョウ並木の続く大阪のオフィス街',
  },
  message: {
    label: 'MESSAGE',
    heading: '代表メッセージ',
    title: '確かな数字を、次の判断の土台に。',
    paragraphs: [
      '売上は、事業の成果をあらわすもっとも基本的な数字です。しかし、生まれたばかりの売上は、まだ確定した数字ではありません。チャネルごとに異なる記録、締め日のずれ、小さな入力の誤り。その一つひとつが、経営の判断にも、お取引先との信頼にも影響します。',
      '私たち株式会社Aionは、営業・マーケティングの運用から、売上の集計、照合、精算の準備までを一つの流れとして管理しています。数字をただ合わせるのではなく、「なぜその数字なのか」を説明できる状態に整えること。それが、私たちの仕事の中心にある考え方です。',
      '目立つことよりも、正確であることを。お取引先の皆さまが安心して次の判断に進めるよう、一つひとつの数字に誠実に向き合ってまいります。',
      '今後とも、どうぞよろしくお願い申し上げます。',
    ],
    company: jaName,
    signers: jaReps,
  },
  business: {
    label: 'BUSINESS',
    heading: '事業内容',
    intro: '売上が生まれる現場から、精算に進める状態まで。三つの領域を一貫して担います。',
    items: [
      {
        title: '営業・マーケティングの運用',
        body: '販売施策やプロモーションの運用を通じて、売上が生まれる現場を整えます。発生した売上は、その場で記録に残します。',
        steps: '01',
        image: 'ops',
        alt: 'オフィス街を歩く会社員',
      },
      {
        title: '売上データの管理',
        body: 'チャネルや期間ごとに散らばる売上を集約し、同じ基準で集計します。締め日に合わせて、数字の範囲を確定させます。',
        steps: '02',
        image: 'data',
        alt: '売上の推移を表示したノートパソコン',
      },
      {
        title: '照合・精算準備',
        body: '集計結果と取引の記録を突き合わせ、差異を解消したうえで、精算に必要な明細と資料を整えます。',
        steps: '03–04',
        image: 'check',
        alt: 'ノートパソコンの横に置かれた電卓',
      },
    ],
  },
  flow: {
    label: 'FLOW',
    heading: '業務の流れ',
    intro: '売上が生まれてから、精算に進めるまで。Aionが管理する四つの工程です。',
    step: 'STEP',
    stages: [
      { title: '運用', body: '販売施策やプロモーションを運用し、発生した売上を記録として次の工程へ渡します。' },
      { title: '集計', body: '記録された売上をチャネル・期間ごとに集め、締め日を基準に一つの数字へまとめます。' },
      { title: '照合', body: 'まとめた数字を取引の記録と照らし合わせ、差異のない状態にしてから次へ進めます。' },
      { title: '精算準備', body: '確定した数字をもとに書類を整え、精算に進める状態で引き渡します。' },
    ],
  },
  values: {
    label: 'VALUES',
    heading: '大切にしていること',
    items: [
      {
        title: '正確であること',
        body: '数字が最初から合っているとは考えません。複数の記録を突き合わせ、合っていることを確かめます。',
      },
      {
        title: 'たどれること',
        body: 'どの数字も、どこで生まれ、どのように集計されたのかを、後から確かめられる形で残します。',
      },
      {
        title: '次に渡せること',
        body: '精算の工程にそのまま進められる状態まで整えて、はじめて仕事を終えたと考えます。',
      },
    ],
  },
  company: {
    label: 'COMPANY',
    heading: '会社概要',
    placeholder: '掲載準備中',
    rows: [
      { term: '会社名', value: jaName },
      { term: '所在地', value: jaAddress },
      { term: '設立', value: '2020年4月1日' },
      { term: '代表者', value: jaReps },
      { term: '資本金', value: '50万円' },
      {
        term: '事業内容',
        value: ['営業・マーケティングの運用', '売上データの集計・照合', '精算準備に関する業務'],
      },
    ],
  },
  access: {
    label: 'ACCESS',
    heading: 'アクセス',
    address: jaAddress,
    stations: [
      'Osaka Metro 御堂筋線・四つ橋線「大国町」駅より徒歩約6分',
      'JR大阪環状線・大和路線「今宮」駅より徒歩約9分',
    ],
    mapTitle: '株式会社Aionの所在地（Google マップ）',
    openMap: 'Google マップで開く',
    newTab: '（新しいタブで開きます）',
  },
  footer: { name: jaName, address: jaAddress, pageTop: 'ページの先頭へ', sitemap: 'サイトマップ' },
};

const ko: Content = {
  htmlLang: 'ko',
  path: '/ko/',
  meta: {
    title: koName,
    description:
      '주식회사 Aion은 영업·마케팅 운영부터 매출 집계와 대사, 정산 준비까지 일관되게 관리하여 수익을 정확하고 추적 가능한 상태로 정리합니다.',
  },
  skip: '본문으로 이동',
  nav: {
    news: '소식',
    about: 'Aion 소개',
    message: '대표 인사말',
    business: '사업 내용',
    flow: '업무 흐름',
    company: '회사 개요',
    access: '오시는 길',
    label: '메인 메뉴',
    open: '메뉴 열기',
    close: '메뉴 닫기',
  },
  langSwitch: { label: '언어 선택' },
  hero: {
    title: ['흐름을 정돈하고,', '숫자를 확실하게.'],
    en: 'Organize the flow. Make every number certain.',
    alt: '오사카 우메다의 빌딩가',
  },
  news: {
    label: 'NEWS',
    heading: '소식',
    // No news for now; add items (newest first) to show the section and its footer link again.
    items: [],
  },
  about: {
    label: 'ABOUT',
    heading: 'Aion 소개',
    statement: '매출은 발생한 순간에는\n아직 확정된 것이 아닙니다.',
    body: '집계 누락, 데이터 불일치, 마감 시점의 어긋남. Aion은 이러한 불확실성을 하나씩 걷어내고, 다음 단계로 그대로 넘길 수 있는 숫자로 정리합니다. 영업·마케팅 운영부터 정산 준비까지를 하나의 흐름으로 관리하여, 모든 숫자에 근거가 있는 상태를 만듭니다.',
    alt: '은행나무 가로수가 이어지는 오사카의 오피스 거리',
  },
  message: {
    label: 'MESSAGE',
    heading: '대표 인사말',
    title: '확실한 숫자를, 다음 판단의 토대로.',
    paragraphs: [
      '매출은 사업의 성과를 보여주는 가장 기본적인 숫자입니다. 하지만 막 발생한 매출은 아직 확정된 숫자가 아닙니다. 채널마다 다른 기록, 마감 시점의 어긋남, 작은 입력 오류. 그 하나하나가 경영 판단에도, 거래처와의 신뢰에도 영향을 줍니다.',
      '저희 주식회사 Aion은 영업·마케팅 운영부터 매출 집계, 대사, 정산 준비까지를 하나의 흐름으로 관리합니다. 숫자를 단순히 맞추는 것이 아니라 \'왜 이 숫자인지\'를 설명할 수 있는 상태로 정리하는 것. 그것이 저희 일의 중심에 있는 생각입니다.',
      '눈에 띄는 것보다 정확한 것을. 거래처 여러분이 안심하고 다음 판단으로 나아가실 수 있도록, 숫자 하나하나를 성실하게 다루겠습니다.',
      '앞으로도 많은 관심 부탁드립니다.',
    ],
    company: koName,
    signers: koReps,
  },
  business: {
    label: 'BUSINESS',
    heading: '사업 내용',
    intro: '매출이 만들어지는 현장부터 정산으로 넘어갈 수 있는 상태까지, 세 가지 영역을 일관되게 담당합니다.',
    items: [
      {
        title: '영업·마케팅 운영',
        body: '판매 전략과 프로모션 운영을 통해 매출로 이어지는 현장을 정돈합니다. 발생한 매출은 그 자리에서 기록으로 남깁니다.',
        steps: '01',
        image: 'ops',
        alt: '오피스 거리를 걷는 회사원들',
      },
      {
        title: '매출 데이터 관리',
        body: '채널과 기간별로 흩어진 매출을 모아 같은 기준으로 집계합니다. 마감일에 맞춰 숫자의 범위를 확정합니다.',
        steps: '02',
        image: 'data',
        alt: '매출 추이를 보여주는 노트북',
      },
      {
        title: '대사·정산 준비',
        body: '집계 결과와 거래 기록을 대조해 차이를 해소한 뒤, 정산에 필요한 명세와 자료를 갖춥니다.',
        steps: '03–04',
        image: 'check',
        alt: '노트북 옆에 놓인 계산기',
      },
    ],
  },
  flow: {
    label: 'FLOW',
    heading: '업무 흐름',
    intro: '매출이 발생한 뒤 정산으로 넘어가기까지. Aion이 관리하는 네 가지 단계입니다.',
    step: 'STEP',
    stages: [
      { title: '운영', body: '판매 전략과 프로모션을 운영하고, 발생한 매출을 기록으로 남겨 다음 단계로 넘깁니다.' },
      { title: '집계', body: '기록된 매출을 채널·기간별로 모아 마감일을 기준으로 하나의 숫자로 정리합니다.' },
      { title: '대사', body: '정리된 숫자를 거래 기록과 대조해 차이가 없는 상태로 만든 뒤 다음 단계로 넘깁니다.' },
      { title: '정산 준비', body: '확정된 숫자를 바탕으로 서류를 갖춰, 정산으로 넘어갈 수 있는 상태로 전달합니다.' },
    ],
  },
  values: {
    label: 'VALUES',
    heading: '중요하게 여기는 것',
    items: [
      {
        title: '정확할 것',
        body: '숫자가 처음부터 맞을 것이라고 전제하지 않습니다. 여러 기록을 대조해 맞는지를 확인합니다.',
      },
      {
        title: '추적할 수 있을 것',
        body: '모든 숫자가 어디서 발생해 어떻게 집계되었는지 나중에도 확인할 수 있는 형태로 남깁니다.',
      },
      {
        title: '다음 단계로 넘길 수 있을 것',
        body: '정산 단계로 바로 이어질 수 있는 상태까지 정리했을 때, 비로소 일을 마쳤다고 생각합니다.',
      },
    ],
  },
  company: {
    label: 'COMPANY',
    heading: '회사 개요',
    placeholder: '추후 공개 예정',
    rows: [
      { term: '회사명', value: `${koName}(${jaName})` },
      { term: '소재지', value: koAddress },
      { term: '설립', value: '2020년 4월 1일' },
      { term: '대표자', value: koReps },
      { term: '자본금', value: '50만 엔' },
      {
        term: '사업 내용',
        value: ['영업·마케팅 운영', '매출 데이터 집계·대사', '정산 준비 관련 업무'],
      },
    ],
  },
  access: {
    label: 'ACCESS',
    heading: '오시는 길',
    address: koAddress,
    stations: [
      'Osaka Metro 미도스지선·요쓰바시선 「다이코쿠초」역에서 도보 약 6분',
      'JR 오사카 순환선·야마토지선 「이마미야」역에서 도보 약 9분',
    ],
    mapTitle: '주식회사 Aion 위치(Google 지도)',
    openMap: 'Google 지도에서 열기',
    newTab: '(새 탭에서 열림)',
  },
  footer: { name: koName, address: koAddress, pageTop: '페이지 맨 위로', sitemap: '사이트맵' },
};

export const content: Record<Lang, Content> = { ja, ko };
export const langs: { lang: Lang; label: string }[] = [
  { lang: 'ja', label: '日本語' },
  { lang: 'ko', label: '한국어' },
];
