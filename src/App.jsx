import { useState, useRef, useEffect } from 'react'

// Vocabulary Component
const vocabularyData = {
  1: [
    { chinese: '甚至', pinyin: 'shènzhì', korean: '심지어, ~조차' },
    { chinese: '柜子', pinyin: 'guìzi', korean: '장, 캐비닛, 서랍장' },
    { chinese: '寄托', pinyin: 'jìtuō', korean: '부탁하다, 의탁하다, (희망을) 걸다' },
    { chinese: '祝愿', pinyin: 'zhùyuàn', korean: '축원하다, 기원하다' },
    { chinese: '广义', pinyin: 'guǎngyì', korean: '광의, 넓은 의미' },
    { chinese: '长寿', pinyin: 'chángshòu', korean: '장수, 장생' },
    { chinese: '行善', pinyin: 'xíngshàn', korean: '선행을 하다, 착한 일을 하다' },
    { chinese: '善终', pinyin: 'shànzhōng', korean: '선종, 좋은 최후를 맞다' },
    { chinese: '习俗', pinyin: 'xísú', korean: '풍습, 관습' },
    { chinese: '传说', pinyin: 'chuánshuō', korean: '전설, 전해 내려오는 이야기' },
    { chinese: '至于', pinyin: 'zhìyú', korean: '~에 이르러서는, ~에 관해서는' },
    { chinese: '起源', pinyin: 'qǐyuán', korean: '기원, 유래, 시작' },
    { chinese: '管家', pinyin: 'guǎnjiā', korean: '집사, 가정 관리자' },
    { chinese: '慌忙', pinyin: 'huāngmáng', korean: '허둥지둥하다, 서두르다' },
    { chinese: '奴才', pinyin: 'núcai', korean: '하인, 노예 (겸손한 1인칭)' },
    { chinese: '吉祥', pinyin: 'jíxiáng', korean: '길상, 상서롭다, 길하다' },
    { chinese: '行人', pinyin: 'xíngrén', korean: '행인, 보행자, 지나가는 사람' },
    { chinese: '惩罚', pinyin: 'chéngfá', korean: '처벌하다, 벌주다' },
    { chinese: '流传', pinyin: 'liúchuán', korean: '유포되다, 전해지다, 퍼지다' },
    { chinese: '对联', pinyin: 'duìlián', korean: '대구, 춘련, 대련' },
    { chinese: '爆竹', pinyin: 'bàozhú', korean: '폭죽, 폭죽소리' },
    { chinese: '瑞雪', pinyin: 'ruìxuě', korean: '상서로운 눈, 풍년설' },
    { chinese: '谐音', pinyin: 'xiéyīn', korean: '동음이의, 발음이 같은 것' },
    { chinese: '购买', pinyin: 'gòumǎi', korean: '구매하다, 사다' },
    { chinese: '除夕', pinyin: 'chúxī', korean: '섣달그믐, 제야' },
    { chinese: '燃放', pinyin: 'ránfàng', korean: '(불꽃·폭죽을) 피우다, 쏘다' },
    { chinese: '鞭炮', pinyin: 'biānpào', korean: '폭죽, 폭죽놀이' },
    { chinese: '擂鼓', pinyin: 'léigǔ', korean: '북을 치다, 북을 울리다' },
    { chinese: '烟花', pinyin: 'yānhuā', korean: '불꽃놀이, 연화' },
    { chinese: '指定', pinyin: 'zhǐdìng', korean: '지정하다, 정하다, 지명하다' },
    { chinese: '气氛', pinyin: 'qìfēn', korean: '분위기, 기운, 무드' },
    { chinese: '火灾', pinyin: 'huǒzāi', korean: '화재, 불난 일' },
    { chinese: '团员', pinyin: 'tuányuán', korean: '단원, 단체 구성원' },
    { chinese: '监狱', pinyin: 'jiānyù', korean: '감옥, 교도소' },
    { chinese: '囚犯', pinyin: 'qiúfàn', korean: '죄수, 수감자' },
    { chinese: '可见', pinyin: 'kějiàn', korean: '~임을 알 수 있다, 분명하다' },
    { chinese: '团聚', pinyin: 'tuánjù', korean: '재회하다, 모이다, 단란하다' },
    { chinese: '丰盛', pinyin: 'fēngshèng', korean: '풍성하다, 풍요롭다' },
    { chinese: '观看', pinyin: 'guānkàn', korean: '관람하다, 구경하다, 보다' },
    { chinese: '打牌', pinyin: 'dǎpái', korean: '카드놀이를 하다, 패를 치다' },
    { chinese: '游戏', pinyin: 'yóuxì', korean: '게임, 놀이, 오락' },
    { chinese: '拜年', pinyin: 'bàinián', korean: '세배하다, 새해 인사하다' },
    { chinese: '恭喜', pinyin: 'gōngxǐ', korean: '축하합니다, 경사스럽다' },
    { chinese: '发财', pinyin: 'fācái', korean: '재물을 모으다, 부자가 되다' },
    { chinese: '赠送', pinyin: 'zèngsòng', korean: '증정하다, 선물로 주다' },
    { chinese: '在于', pinyin: 'zàiyú', korean: '~에 달려 있다, ~에 있다' },
    { chinese: '象征', pinyin: 'xiàngzhēng', korean: '상징하다, 상징' },
    { chinese: '游乐', pinyin: 'yóulè', korean: '유락, 놀이와 오락' },
    { chinese: '庙会', pinyin: 'miàohuì', korean: '절의 시장, 사찰 축제' },
    { chinese: '火鸡', pinyin: 'huǒjī', korean: '칠면조' },
    { chinese: '年糕', pinyin: 'niángāo', korean: '떡, 년고 (설 떡)' },
    { chinese: '漫长', pinyin: 'màncháng', korean: '긴, 장구한, 오랜' },
    { chinese: '迷信', pinyin: 'míxìn', korean: '미신, 맹신하다' },
    { chinese: '淘汰', pinyin: 'táotài', korean: '도태되다, 탈락하다, 제거되다' },
    { chinese: '盛行', pinyin: 'shèngxíng', korean: '유행하다, 성행하다, 퍼지다' },
  ],
  2: [
    { chinese: '家宴', pinyin: 'jiāyàn', korean: '가족 연회, 집안 잔치' },
    { chinese: '长辈', pinyin: 'zhǎngbèi', korean: '연장자, 어른, 윗사람' },
    { chinese: '吉利', pinyin: 'jílì', korean: '길리, 길하다, 상서롭다' },
    { chinese: '替代', pinyin: 'tìdài', korean: '대체하다, 대신하다, 교체하다' },
    { chinese: '祈求', pinyin: 'qíqiú', korean: '기원하다, 빌다, 간절히 바라다' },
    { chinese: '崇拜', pinyin: 'chóngbài', korean: '숭배하다, 경배하다, 존경하다' },
    { chinese: '新郎', pinyin: 'xīnláng', korean: '신랑, 새신랑' },
    { chinese: '新娘', pinyin: 'xīnniáng', korean: '신부, 새색시' },
    { chinese: '洞房', pinyin: 'dòngfáng', korean: '신방, 결혼 첫날 밤 방' },
    { chinese: '栗子', pinyin: 'lìzi', korean: '밤 (식물), 캐스터넛' },
    { chinese: '驱除', pinyin: 'qūchú', korean: '쫓아내다, 제거하다, 퇴치하다' },
    { chinese: '器物', pinyin: 'qìwù', korean: '기물, 도구, 그릇' },
    { chinese: '联想', pinyin: 'liánxiǎng', korean: '연상하다, 관련지어 생각하다' },
    { chinese: '恋人', pinyin: 'liànrén', korean: '연인, 사랑하는 사람, 애인' },
    { chinese: '禁忌', pinyin: 'jìnjì', korean: '금기, 금지사항, 꺼리는 것' },
    { chinese: '送礼', pinyin: 'sònglǐ', korean: '선물을 주다, 예물을 보내다' },
    { chinese: '礼俗', pinyin: 'lǐsú', korean: '예속, 의례와 풍습' },
    { chinese: '原始', pinyin: 'yuánshǐ', korean: '원시, 최초의, 처음의' },
    { chinese: '初始', pinyin: 'chūshǐ', korean: '초기, 시작, 출발점' },
    { chinese: '无知', pinyin: 'wúzhī', korean: '무지, 모름, 지식이 없음' },
    { chinese: '恐惧', pinyin: 'kǒngjù', korean: '공포, 두려움, 무서움' },
    { chinese: '能量', pinyin: 'néngliàng', korean: '에너지, 능력, 힘' },
    { chinese: '图腾', pinyin: 'túténg', korean: '토템, 부족의 상징물' },
    { chinese: '观念', pinyin: 'guānniàn', korean: '관념, 생각, 가치관' },
    { chinese: '毒性', pinyin: 'dúxìng', korean: '독성, 독, 해로움' },
    { chinese: '远古', pinyin: 'yuǎngǔ', korean: '아주 먼 옛날, 고대, 상고' },
    { chinese: '敬畏', pinyin: 'jìngwèi', korean: '경외, 존경과 두려움' },
    { chinese: '神话', pinyin: 'shénhuà', korean: '신화, 전설적 이야기' },
    { chinese: '幻想', pinyin: 'huànxiǎng', korean: '환상, 공상, 망상' },
    { chinese: '传人', pinyin: 'chuánrén', korean: '전승자, 후계자, 계승자' },
    { chinese: '君王', pinyin: 'jūnwáng', korean: '군주, 왕, 임금' },
    { chinese: '喜事', pinyin: 'xǐshì', korean: '경사, 기쁜 일, 혼례' },
    { chinese: '含义', pinyin: 'hányì', korean: '함의, 내포된 뜻, 의미' },
    { chinese: '绸子', pinyin: 'chóuzi', korean: '비단, 명주, 견직물' },
    { chinese: '场合', pinyin: 'chǎnghé', korean: '장소와 상황, 경우, 때' },
    { chinese: '相关', pinyin: 'xiāngguān', korean: '관련되다, 상관있다, 연관되다' },
    { chinese: '葬礼', pinyin: 'zànglǐ', korean: '장례식, 장사, 매장 의례' },
    { chinese: '丧服', pinyin: 'sāngfú', korean: '상복, 장례 옷, 애도복' },
    { chinese: '忌讳', pinyin: 'jìhuì', korean: '꺼리다, 금기시하다, 피하다' },
    { chinese: '尊称', pinyin: 'zūnchēng', korean: '존칭, 높여 부르는 말' },
    { chinese: '婚配', pinyin: 'hūnpèi', korean: '혼인, 결혼, 배우자 맺기' },
    { chinese: '行业', pinyin: 'hángyè', korean: '업계, 직종, 직업 분야' },
    { chinese: '渔民', pinyin: 'yúmín', korean: '어민, 어부, 고기잡이 사람' },
    { chinese: '隐私', pinyin: 'yǐnsī', korean: '사생활, 프라이버시, 비밀' },
    { chinese: '情趣', pinyin: 'qíngqù', korean: '정취, 취미, 삶의 맛' },
    { chinese: '客观', pinyin: 'kèguān', korean: '객관적, 객관, 주관과 반대' },
  ],
  3: [
    { chinese: '服装', pinyin: 'fúzhuāng', korean: '의복, 옷차림, 의상' },
    { chinese: '一度', pinyin: 'yídù', korean: '한때, 일시적으로, 잠시' },
    { chinese: '耀眼', pinyin: 'yàoyǎn', korean: '눈부시다, 화려하다, 빛나다' },
    { chinese: '图案', pinyin: 'tú\'àn', korean: '도안, 무늬, 패턴, 디자인' },
    { chinese: '牡丹', pinyin: 'mǔdān', korean: '모란 (꽃), 부귀의 상징' },
    { chinese: '名称', pinyin: 'míngchēng', korean: '명칭, 이름, 칭호' },
    { chinese: '采访', pinyin: 'cǎifǎng', korean: '취재하다, 인터뷰하다, 방문 조사' },
    { chinese: '称呼', pinyin: 'chēnghu', korean: '호칭, 부르다, 명칭' },
    { chinese: '海外', pinyin: 'hǎiwài', korean: '해외, 외국, 바깥세계' },
    { chinese: '聚集', pinyin: 'jùjí', korean: '모이다, 집결하다, 모임' },
    { chinese: '样式', pinyin: 'yàngshì', korean: '양식, 스타일, 형태' },
    { chinese: '对襟', pinyin: 'duìjīn', korean: '앞여밈 옷깃, 대금, 정면 단추' },
    { chinese: '偏襟', pinyin: 'piānjīn', korean: '옆여밈 옷깃, 사금, 측면 단추' },
    { chinese: '立领', pinyin: 'lǐnglǐng', korean: '깃, 섶이 서 있는 칼라, 스탠딩 칼라' },
    { chinese: '延续', pinyin: 'yánxù', korean: '이어지다, 지속되다, 계승되다' },
    { chinese: '改良', pinyin: 'gǎiliáng', korean: '개량하다, 개선하다, 발전시키다' },
    { chinese: '确切', pinyin: 'quèqiè', korean: '정확한, 확실한, 명백한' },
    { chinese: '融合', pinyin: 'rónghé', korean: '융합하다, 통합되다, 섞이다' },
    { chinese: '朝代', pinyin: 'cháodài', korean: '왕조, 시대, 통치 기간' },
    { chinese: '误解', pinyin: 'wùjiě', korean: '오해, 잘못 이해하다, 착각' },
    { chinese: '本身', pinyin: 'běnshēn', korean: '그 자체, 본신, 본질' },
    { chinese: '宽大', pinyin: 'kuāndà', korean: '넓다, 관대하다, 넉넉하다' },
    { chinese: '飘逸', pinyin: 'piāoyì', korean: '가볍게 날리다, 우아하다, 흐르는 듯' },
    { chinese: '长衫', pinyin: 'chángshān', korean: '장삼, 긴 저고리, 전통 남성복' },
    { chinese: '并存', pinyin: 'bìngcún', korean: '병존하다, 함께 존재하다, 공존' },
    { chinese: '平面', pinyin: 'píngmiàn', korean: '평면, 2차원, 납작한 면' },
    { chinese: '裁剪', pinyin: 'cáijiǎn', korean: '재단하다, 자르다, 디자인하다' },
    { chinese: '人体', pinyin: 'réntǐ', korean: '인체, 사람의 몸, 신체' },
    { chinese: '特征', pinyin: 'tèzhēng', korean: '특징, 특성, 고유한 성질' },
    { chinese: '色彩', pinyin: 'sècǎi', korean: '색채, 색깔, 색상' },
    { chinese: '装饰', pinyin: 'zhuāngshì', korean: '장식, 꾸미다, 장식품' },
    { chinese: '塑造', pinyin: 'sùzào', korean: '조형하다, 형성하다, 이미지를 만들다' },
    { chinese: '强化', pinyin: 'qiánghuà', korean: '강화하다, 강하게 하다, 증대시키다' },
    { chinese: '性别', pinyin: 'xìngbié', korean: '성별, 남녀, 젠더' },
    { chinese: '地理', pinyin: 'dìlǐ', korean: '지리, 지리적, 지역적 특성' },
    { chinese: '面料', pinyin: 'miànliào', korean: '원단, 직물, 옷감' },
    { chinese: '追求', pinyin: 'zhuīqiú', korean: '추구하다, 쫓다, 목표를 향하다' },
    { chinese: '和谐', pinyin: 'héxié', korean: '조화, 조화로움, 균형' },
    { chinese: '款式', pinyin: 'kuǎnshì', korean: '스타일, 디자인, 형식' },
    { chinese: '线条', pinyin: 'xiàntiáo', korean: '선, 라인, 윤곽' },
    { chinese: '服饰', pinyin: 'fúshì', korean: '복식, 의상과 장식, 패션' },
    { chinese: '旗袍', pinyin: 'qípáo', korean: '치파오, 기포 (중국 전통 여성복)' },
    { chinese: '马褂', pinyin: 'mǎguà', korean: '마과, 기마용 짧은 겉옷' },
    { chinese: '开衩', pinyin: 'kāichà', korean: '트임, 옆트임, 슬릿' },
    { chinese: '曲线', pinyin: 'qūxiàn', korean: '곡선, 커브, 유연한 선' },
    { chinese: '轻便', pinyin: 'qīngbiàn', korean: '가볍고 편리하다, 휴대하기 좋다' },
    { chinese: '演变', pinyin: 'yǎnbiàn', korean: '변천하다, 진화하다, 변화하다' },
    { chinese: '带头', pinyin: 'dàitóu', korean: '선도하다, 앞장서다, 이끌다' },
    { chinese: '深远', pinyin: 'shēnyuǎn', korean: '심원한, 깊은 영향, 장원한' },
    { chinese: '话题', pinyin: 'huàtí', korean: '화제, 이야기 주제, 논의 대상' },
    { chinese: '角度', pinyin: 'jiǎodù', korean: '각도, 관점, 시각' },
    { chinese: '独特', pinyin: 'dútè', korean: '독특한, 특별하다, 유일하다' },
    { chinese: '韵味', pinyin: 'yùnwèi', korean: '운치, 여운, 풍미' },
    { chinese: '个性', pinyin: 'gèxìng', korean: '개성, 성격, 고유한 특징' },
    { chinese: '便于', pinyin: 'biànyú', korean: '~하기 쉽다, 편리하다, 용이하다' },
    { chinese: '尝试', pinyin: 'chángshì', korean: '시도하다, 해보다, 실험하다' },
    { chinese: '潮流', pinyin: 'cháoliú', korean: '조류, 트렌드, 유행' },
    { chinese: '特色', pinyin: 'tèsè', korean: '특색, 특징, 고유한 점' },
    { chinese: '前景', pinyin: 'qiánjǐng', korean: '전망, 앞날, 미래 예측' },
  ],
}

function Vocabulary() {
  const [selectedUnit, setSelectedUnit] = useState(1)
  const [selectedBatch, setSelectedBatch] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [shuffledWords, setShuffledWords] = useState([])
  const [isGridView, setIsGridView] = useState(false)
  const [keysPressed, setKeysPressed] = useState(new Set())

  const currentUnitWords = vocabularyData[selectedUnit]
  const batchSize = 20
  const totalBatches = Math.ceil(currentUnitWords.length / batchSize)
  
  const currentBatchWords = shuffledWords.length > 0 ? shuffledWords : currentUnitWords.slice(
    selectedBatch * batchSize,
    (selectedBatch + 1) * batchSize
  )

  const currentWord = currentBatchWords[currentIndex]

  // Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const handleShuffle = () => {
    const batchWords = currentUnitWords.slice(
      selectedBatch * batchSize,
      (selectedBatch + 1) * batchSize
    )
    setShuffledWords(shuffleArray(batchWords))
    setCurrentIndex(0)
    setFlipped(false)
  }

  const nextCard = () => {
    if (currentIndex < currentBatchWords.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setFlipped(false)
    }
  }

  const toggleFlip = () => setFlipped(!flipped)

  useEffect(() => {
    setCurrentIndex(0)
    setFlipped(false)
    setShuffledWords([])
  }, [selectedUnit, selectedBatch])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeysPressed(prev => new Set(prev).add(e.key))

      // Q+P Easter egg
      if (keysPressed.has('q') && e.key === 'p') {
        setIsGridView(!isGridView)
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          toggleFlip()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevCard()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextCard()
          break
      }
    }

    const handleKeyUp = (e) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev)
        newSet.delete(e.key)
        return newSet
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [keysPressed, isGridView])

  // Grid view
  if (isGridView) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            그리드 뷰 - {selectedUnit}단원 {selectedBatch + 1}세트
          </h2>
          <button
            onClick={() => setIsGridView(false)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
          >
            닫기
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentBatchWords.map((word, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white text-center cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <p className="text-2xl font-bold mb-1 chinese-handwriting">{word.chinese}</p>
              <p className="text-sm text-indigo-200">{word.pinyin}</p>
              <p className="text-xs mt-2 text-indigo-100">{word.korean}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          중단어 플래시카드
        </h2>
        <button
          onClick={handleShuffle}
          className="px-3 py-2 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
        >
          🔀 섞기
        </button>
      </div>

      {/* Unit & Batch Selection */}
      <div className="mb-4 md:mb-6">
        <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
          단원 선택:
        </label>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(unit => (
            <button
              key={unit}
              onClick={() => setSelectedUnit(unit)}
              className={`flex-1 px-3 py-3 md:px-4 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                selectedUnit === unit
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {unit}단원
            </button>
          ))}
        </div>

        {totalBatches > 1 && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
              세트 선택 (20개씩):
            </label>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: totalBatches }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBatch(i)}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                    selectedBatch === i
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}세트
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Flashcard */}
      <div
        className="relative h-56 md:h-72 mb-4 md:mb-6 cursor-pointer perspective-1000"
        onClick={toggleFlip}
      >
        <div className="relative w-full h-full">
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              flipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="text-center text-white">
              <p className="text-2xl md:text-3xl text-indigo-200 mb-4">{currentWord.pinyin}</p>
              <p className="text-4xl md:text-6xl font-bold chinese-handwriting">{currentWord.chinese}</p>
            </div>
          </div>

          <div
            className={`absolute w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
              flipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="text-center text-white">
              <p className="text-4xl md:text-5xl font-bold mb-4">{currentWord.korean}</p>
              <p className="text-xl text-green-200">클릭해서 뒤집기</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-3 md:gap-4 mb-4 md:mb-6">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`px-4 py-4 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          ← 이전
        </button>
        <button
          onClick={nextCard}
          disabled={currentIndex === currentBatchWords.length - 1}
          className={`px-4 py-4 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${
            currentIndex === currentBatchWords.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          다음 →
        </button>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="text-gray-500 mb-2">
          {currentIndex + 1} / {currentBatchWords.length}
          {totalBatches > 1 && ` (총 ${currentUnitWords.length}개 중 ${selectedBatch * batchSize + 1}-${Math.min((selectedBatch + 1) * batchSize, currentUnitWords.length)}개)`}
        </div>
        <div className="flex justify-center gap-1">
          {currentBatchWords.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-indigo-600'
                  : index < currentIndex
                  ? 'bg-indigo-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="mt-4 text-center text-gray-400 text-sm">
        단축키: 스페이스바 (뒤집기) | ← → (이동)
      </div>
    </div>
  )
}

// Grammar Component
const sampleGrammar = [
  {
    pattern: '是...的',
    description: '강조 표현 - 이미 발생한 사실을 강조할 때 사용',
    example: '我是昨天来的。',
    exampleMeaning: '저는 어제 왔어요.',
  },
  {
    pattern: '在...正在...',
    description: '진행형 - 현재 어떤 동작이 진행 중임을 나타냄',
    example: '他正在看书。',
    exampleMeaning: '그는 지금 책을 읽고 있어요.',
  },
  {
    pattern: '要...了',
    description: '직접형 - 곧 어떤 일이 일어날 것임을 나타냄',
    example: '要下雨了。',
    exampleMeaning: '비가 곧 올 것 같아요.',
  },
]

function Grammar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userSentence, setUserSentence] = useState('')
  const [feedback, setFeedback] = useState(null)

  const currentGrammar = sampleGrammar[currentIndex]

  const checkSentence = () => {
    if (userSentence.trim() === '') {
      setFeedback({ type: 'warning', message: '문장을 입력해주세요!' })
      return
    }
    
    setFeedback({ type: 'success', message: '좋은 문장입니다! 계속 연습해보세요.' })
    setUserSentence('')
  }

  const nextPattern = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleGrammar.length)
    setUserSentence('')
    setFeedback(null)
  }

  const prevPattern = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleGrammar.length) % sampleGrammar.length)
    setUserSentence('')
    setFeedback(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        문법 학습 & 문장 만들기
      </h2>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
        <h3 className="text-3xl font-bold text-indigo-800 mb-3">
          {currentGrammar.pattern}
        </h3>
        <p className="text-gray-700 mb-4">{currentGrammar.description}</p>
        <div className="bg-white rounded-lg p-4">
          <p className="text-lg text-gray-800">
            <span className="font-semibold">예문:</span> {currentGrammar.example}
          </p>
          <p className="text-gray-600">{currentGrammar.exampleMeaning}</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          이 문법을 사용해서 문장 만들어보기:
        </label>
        <textarea
          value={userSentence}
          onChange={(e) => setUserSentence(e.target.value)}
          placeholder="여기에 문장을 입력하세요..."
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
          rows={3}
        />
      </div>

      {feedback && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            feedback.type === 'success'
              ? 'bg-green-100 text-green-800'
              : feedback.type === 'warning'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={checkSentence}
          className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
        >
          확인하기
        </button>
        <button
          onClick={nextPattern}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
        >
          다음 문법 →
        </button>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevPattern}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← 이전
        </button>
        <span className="text-gray-500">
          {currentIndex + 1} / {sampleGrammar.length}
        </span>
      </div>
    </div>
  )
}

// HandwritingCanvas Component
const unitsData = {
  1: [
    { pinyin: 'shènzhì', character: '甚至', meaning: '심지어, ~조차' },
    { pinyin: 'guìzi', character: '柜子', meaning: '장, 캐비닛, 서랍장' },
    { pinyin: 'jìtuō', character: '寄托', meaning: '부탁하다, 의탁하다, (희망을) 걸다' },
    { pinyin: 'zhùyuàn', character: '祝愿', meaning: '축원하다, 기원하다' },
    { pinyin: 'guǎngyì', character: '广义', meaning: '광의, 넓은 의미' },
    { pinyin: 'chángshòu', character: '长寿', meaning: '장수, 장생' },
    { pinyin: 'xíngshàn', character: '行善', meaning: '선행을 하다, 착한 일을 하다' },
    { pinyin: 'shànzhōng', character: '善终', meaning: '선종, 좋은 최후를 맞다' },
    { pinyin: 'xísú', character: '习俗', meaning: '풍습, 관습' },
    { pinyin: 'chuánshuō', character: '传说', meaning: '전설, 전해 내려오는 이야기' },
    { pinyin: 'zhìyú', character: '至于', meaning: '~에 이르러서는, ~에 관해서는' },
    { pinyin: 'qǐyuán', character: '起源', meaning: '기원, 유래, 시작' },
    { pinyin: 'guǎnjiā', character: '管家', meaning: '집사, 가정 관리자' },
    { pinyin: 'huāngmáng', character: '慌忙', meaning: '허둥지둥하다, 서두르다' },
    { pinyin: 'núcai', character: '奴才', meaning: '하인, 노예 (겸손한 1인칭)' },
    { pinyin: 'jíxiáng', character: '吉祥', meaning: '길상, 상서롭다, 길하다' },
    { pinyin: 'xíngrén', character: '行人', meaning: '행인, 보행자, 지나가는 사람' },
    { pinyin: 'chéngfá', character: '惩罚', meaning: '처벌하다, 벌주다' },
    { pinyin: 'liúchuán', character: '流传', meaning: '유포되다, 전해지다, 퍼지다' },
    { pinyin: 'duìlián', character: '对联', meaning: '대구, 춘련, 대련' },
    { pinyin: 'bàozhú', character: '爆竹', meaning: '폭죽, 폭죽소리' },
    { pinyin: 'ruìxuě', character: '瑞雪', meaning: '상서로운 눈, 풍년설' },
    { pinyin: 'xiéyīn', character: '谐音', meaning: '동음이의, 발음이 같은 것' },
    { pinyin: 'gòumǎi', character: '购买', meaning: '구매하다, 사다' },
    { pinyin: 'chúxī', character: '除夕', meaning: '섣달그믐, 제야' },
    { pinyin: 'ránfàng', character: '燃放', meaning: '(불꽃·폭죽을) 피우다, 쏘다' },
    { pinyin: 'biānpào', character: '鞭炮', meaning: '폭죽, 폭죽놀이' },
    { pinyin: 'léigǔ', character: '擂鼓', meaning: '북을 치다, 북을 울리다' },
    { pinyin: 'yānhuā', character: '烟花', meaning: '불꽃놀이, 연화' },
    { pinyin: 'zhǐdìng', character: '指定', meaning: '지정하다, 정하다, 지명하다' },
    { pinyin: 'qìfēn', character: '气氛', meaning: '분위기, 기운, 무드' },
    { pinyin: 'huǒzāi', character: '火灾', meaning: '화재, 불난 일' },
    { pinyin: 'tuányuán', character: '团员', meaning: '단원, 단체 구성원' },
    { pinyin: 'jiānyù', character: '监狱', meaning: '감옥, 교도소' },
    { pinyin: 'qiúfàn', character: '囚犯', meaning: '죄수, 수감자' },
    { pinyin: 'kějiàn', character: '可见', meaning: '~임을 알 수 있다, 분명하다' },
    { pinyin: 'tuánjù', character: '团聚', meaning: '재회하다, 모이다, 단란하다' },
    { pinyin: 'fēngshèng', character: '丰盛', meaning: '풍성하다, 풍요롭다' },
    { pinyin: 'guānkàn', character: '观看', meaning: '관람하다, 구경하다, 보다' },
    { pinyin: 'dǎpái', character: '打牌', meaning: '카드놀이를 하다, 패를 치다' },
    { pinyin: 'yóuxì', character: '游戏', meaning: '게임, 놀이, 오락' },
    { pinyin: 'bàinián', character: '拜年', meaning: '세배하다, 새해 인사하다' },
    { pinyin: 'gōngxǐ', character: '恭喜', meaning: '축하합니다, 경사스럽다' },
    { pinyin: 'fācái', character: '发财', meaning: '재물을 모으다, 부자가 되다' },
    { pinyin: 'zèngsòng', character: '赠送', meaning: '증정하다, 선물로 주다' },
    { pinyin: 'zàiyú', character: '在于', meaning: '~에 달려 있다, ~에 있다' },
    { pinyin: 'xiàngzhēng', character: '象征', meaning: '상징하다, 상징' },
    { pinyin: 'yóulè', character: '游乐', meaning: '유락, 놀이와 오락' },
    { pinyin: 'miàohuì', character: '庙会', meaning: '절의 시장, 사찰 축제' },
    { pinyin: 'huǒjī', character: '火鸡', meaning: '칠면조' },
    { pinyin: 'niángāo', character: '年糕', meaning: '떡, 년고 (설 떡)' },
    { pinyin: 'màncháng', character: '漫长', meaning: '긴, 장구한, 오랜' },
    { pinyin: 'míxìn', character: '迷信', meaning: '미신, 맹신하다' },
    { pinyin: 'táotài', character: '淘汰', meaning: '도태되다, 탈락하다, 제거되다' },
    { pinyin: 'shèngxíng', character: '盛行', meaning: '유행하다, 성행하다, 퍼지다' },
  ],
  2: [
    { pinyin: 'jiāyàn', character: '家宴', meaning: '가족 연회, 집안 잔치' },
    { pinyin: 'zhǎngbèi', character: '长辈', meaning: '연장자, 어른, 윗사람' },
    { pinyin: 'jílì', character: '吉利', meaning: '길리, 길하다, 상서롭다' },
    { pinyin: 'tìdài', character: '替代', meaning: '대체하다, 대신하다, 교체하다' },
    { pinyin: 'qíqiú', character: '祈求', meaning: '기원하다, 빌다, 간절히 바라다' },
    { pinyin: 'chóngbài', character: '崇拜', meaning: '숭배하다, 경배하다, 존경하다' },
    { pinyin: 'xīnláng', character: '新郎', meaning: '신랑, 새신랑' },
    { pinyin: 'xīnniáng', character: '新娘', meaning: '신부, 새색시' },
    { pinyin: 'dòngfáng', character: '洞房', meaning: '신방, 결혼 첫날 밤 방' },
    { pinyin: 'lìzi', character: '栗子', meaning: '밤 (식물), 캐스터넛' },
    { pinyin: 'qūchú', character: '驱除', meaning: '쫓아내다, 제거하다, 퇴치하다' },
    { pinyin: 'qìwù', character: '器物', meaning: '기물, 도구, 그릇' },
    { pinyin: 'liánxiǎng', character: '联想', meaning: '연상하다, 관련지어 생각하다' },
    { pinyin: 'liànrén', character: '恋人', meaning: '연인, 사랑하는 사람, 애인' },
    { pinyin: 'jìnjì', character: '禁忌', meaning: '금기, 금지사항, 꺼리는 것' },
    { pinyin: 'sònglǐ', character: '送礼', meaning: '선물을 주다, 예물을 보내다' },
    { pinyin: 'lǐsú', character: '礼俗', meaning: '예속, 의례와 풍습' },
    { pinyin: 'yuánshǐ', character: '原始', meaning: '원시, 최초의, 처음의' },
    { pinyin: 'chūshǐ', character: '初始', meaning: '초기, 시작, 출발점' },
    { pinyin: 'wúzhī', character: '无知', meaning: '무지, 모름, 지식이 없음' },
    { pinyin: 'kǒngjù', character: '恐惧', meaning: '공포, 두려움, 무서움' },
    { pinyin: 'néngliàng', character: '能量', meaning: '에너지, 능력, 힘' },
    { pinyin: 'túténg', character: '图腾', meaning: '토템, 부족의 상징물' },
    { pinyin: 'guānniàn', character: '观念', meaning: '관념, 생각, 가치관' },
    { pinyin: 'dúxìng', character: '毒性', meaning: '독성, 독, 해로움' },
    { pinyin: 'yuǎngǔ', character: '远古', meaning: '아주 먼 옛날, 고대, 상고' },
    { pinyin: 'jìngwèi', character: '敬畏', meaning: '경외, 존경과 두려움' },
    { pinyin: 'shénhuà', character: '神话', meaning: '신화, 전설적 이야기' },
    { pinyin: 'huànxiǎng', character: '幻想', meaning: '환상, 공상, 망상' },
    { pinyin: 'chuánrén', character: '传人', meaning: '전승자, 후계자, 계승자' },
    { pinyin: 'jūnwáng', character: '君王', meaning: '군주, 왕, 임금' },
    { pinyin: 'xǐshì', character: '喜事', meaning: '경사, 기쁜 일, 혼례' },
    { pinyin: 'hányì', character: '含义', meaning: '함의, 내포된 뜻, 의미' },
    { pinyin: 'chóuzi', character: '绸子', meaning: '비단, 명주, 견직물' },
    { pinyin: 'chǎnghé', character: '场合', meaning: '장소와 상황, 경우, 때' },
    { pinyin: 'xiāngguān', character: '相关', meaning: '관련되다, 상관있다, 연관되다' },
    { pinyin: 'zànglǐ', character: '葬礼', meaning: '장례식, 장사, 매장 의례' },
    { pinyin: 'sāngfú', character: '丧服', meaning: '상복, 장례 옷, 애도복' },
    { pinyin: 'jìhuì', character: '忌讳', meaning: '꺼리다, 금기시하다, 피하다' },
    { pinyin: 'zūnchēng', character: '尊称', meaning: '존칭, 높여 부르는 말' },
    { pinyin: 'hūnpèi', character: '婚配', meaning: '혼인, 결혼, 배우자 맺기' },
    { pinyin: 'hángyè', character: '行业', meaning: '업계, 직종, 직업 분야' },
    { pinyin: 'yúmín', character: '渔民', meaning: '어민, 어부, 고기잡이 사람' },
    { pinyin: 'yǐnsī', character: '隐私', meaning: '사생활, 프라이버시, 비밀' },
    { pinyin: 'qíngqù', character: '情趣', meaning: '정취, 취미, 삶의 맛' },
    { pinyin: 'kèguān', character: '客观', meaning: '객관적, 객관, 주관과 반대' },
  ],
  3: [
    { pinyin: 'fúzhuāng', character: '服装', meaning: '의복, 옷차림, 의상' },
    { pinyin: 'yídù', character: '一度', meaning: '한때, 일시적으로, 잠시' },
    { pinyin: 'yàoyǎn', character: '耀眼', meaning: '눈부시다, 화려하다, 빛나다' },
    { pinyin: 'tú\'àn', character: '图案', meaning: '도안, 무늬, 패턴, 디자인' },
    { pinyin: 'mǔdān', character: '牡丹', meaning: '모란 (꽃), 부귀의 상징' },
    { pinyin: 'míngchēng', character: '名称', meaning: '명칭, 이름, 칭호' },
    { pinyin: 'cǎifǎng', character: '采访', meaning: '취재하다, 인터뷰하다, 방문 조사' },
    { pinyin: 'chēnghu', character: '称呼', meaning: '호칭, 부르다, 명칭' },
    { pinyin: 'hǎiwài', character: '海外', meaning: '해외, 외국, 바깥세계' },
    { pinyin: 'jùjí', character: '聚集', meaning: '모이다, 집결하다, 모임' },
    { pinyin: 'yàngshì', character: '样式', meaning: '양식, 스타일, 형태' },
    { pinyin: 'duìjīn', character: '对襟', meaning: '앞여밈 옷깃, 대금, 정면 단추' },
    { pinyin: 'piānjīn', character: '偏襟', meaning: '옆여밈 옷깃, 사금, 측면 단추' },
    { pinyin: 'lǐnglǐng', character: '立领', meaning: '깃, 섶이 서 있는 칼라, 스탠딩 칼라' },
    { pinyin: 'yánxù', character: '延续', meaning: '이어지다, 지속되다, 계승되다' },
    { pinyin: 'gǎiliáng', character: '改良', meaning: '개량하다, 개선하다, 발전시키다' },
    { pinyin: 'quèqiè', character: '确切', meaning: '정확한, 확실한, 명백한' },
    { pinyin: 'rónghé', character: '融合', meaning: '융합하다, 통합되다, 섞이다' },
    { pinyin: 'cháodài', character: '朝代', meaning: '왕조, 시대, 통치 기간' },
    { pinyin: 'wùjiě', character: '误解', meaning: '오해, 잘못 이해하다, 착각' },
    { pinyin: 'běnshēn', character: '本身', meaning: '그 자체, 본신, 본질' },
    { pinyin: 'kuāndà', character: '宽大', meaning: '넓다, 관대하다, 넉넉하다' },
    { pinyin: 'piāoyì', character: '飘逸', meaning: '가볍게 날리다, 우아하다, 흐르는 듯' },
    { pinyin: 'chángshān', character: '长衫', meaning: '장삼, 긴 저고리, 전통 남성복' },
    { pinyin: 'bìngcún', character: '并存', meaning: '병존하다, 함께 존재하다, 공존' },
    { pinyin: 'píngmiàn', character: '平面', meaning: '평면, 2차원, 납작한 면' },
    { pinyin: 'cáijiǎn', character: '裁剪', meaning: '재단하다, 자르다, 디자인하다' },
    { pinyin: 'réntǐ', character: '人体', meaning: '인체, 사람의 몸, 신체' },
    { pinyin: 'tèzhēng', character: '特征', meaning: '특징, 특성, 고유한 성질' },
    { pinyin: 'sècǎi', character: '色彩', meaning: '색채, 색깔, 색상' },
    { pinyin: 'zhuāngshì', character: '装饰', meaning: '장식, 꾸미다, 장식품' },
    { pinyin: 'sùzào', character: '塑造', meaning: '조형하다, 형성하다, 이미지를 만들다' },
    { pinyin: 'qiánghuà', character: '强化', meaning: '강화하다, 강하게 하다, 증대시키다' },
    { pinyin: 'xìngbié', character: '性别', meaning: '성별, 남녀, 젠더' },
    { pinyin: 'dìlǐ', character: '地理', meaning: '지리, 지리적, 지역적 특성' },
    { pinyin: 'miànliào', character: '面料', meaning: '원단, 직물, 옷감' },
    { pinyin: 'zhuīqiú', character: '追求', meaning: '추구하다, 쫓다, 목표를 향하다' },
    { pinyin: 'héxié', character: '和谐', meaning: '조화, 조화로움, 균형' },
    { pinyin: 'kuǎnshì', character: '款式', meaning: '스타일, 디자인, 형식' },
    { pinyin: 'xiàntiáo', character: '线条', meaning: '선, 라인, 윤곽' },
    { pinyin: 'fúshì', character: '服饰', meaning: '복식, 의상과 장식, 패션' },
    { pinyin: 'qípáo', character: '旗袍', meaning: '치파오, 기포 (중국 전통 여성복)' },
    { pinyin: 'mǎguà', character: '马褂', meaning: '마과, 기마용 짧은 겉옷' },
    { pinyin: 'kāichà', character: '开衩', meaning: '트임, 옆트임, 슬릿' },
    { pinyin: 'qūxiàn', character: '曲线', meaning: '곡선, 커브, 유연한 선' },
    { pinyin: 'qīngbiàn', character: '轻便', meaning: '가볍고 편리하다, 휴대하기 좋다' },
    { pinyin: 'yǎnbiàn', character: '演变', meaning: '변천하다, 진화하다, 변화하다' },
    { pinyin: 'dàitóu', character: '带头', meaning: '선도하다, 앞장서다, 이끌다' },
    { pinyin: 'shēnyuǎn', character: '深远', meaning: '심원한, 깊은 영향, 장원한' },
    { pinyin: 'huàtí', character: '话题', meaning: '화제, 이야기 주제, 논의 대상' },
    { pinyin: 'jiǎodù', character: '角度', meaning: '각도, 관점, 시각' },
    { pinyin: 'dútè', character: '独特', meaning: '독특한, 특별하다, 유일하다' },
    { pinyin: 'yùnwèi', character: '韵味', meaning: '운치, 여운, 풍미' },
    { pinyin: 'gèxìng', character: '个性', meaning: '개성, 성격, 고유한 특징' },
    { pinyin: 'biànyú', character: '便于', meaning: '~하기 쉽다, 편리하다, 용이하다' },
    { pinyin: 'chángshì', character: '尝试', meaning: '시도하다, 해보다, 실험하다' },
    { pinyin: 'cháoliú', character: '潮流', meaning: '조류, 트렌드, 유행' },
    { pinyin: 'tèsè', character: '特色', meaning: '특색, 특징, 고유한 점' },
    { pinyin: 'qiánjǐng', character: '前景', meaning: '전망, 앞날, 미래 예측' },
  ],
}

function HandwritingCanvas() {
  const canvasRef = useRef(null)
  const [selectedUnit, setSelectedUnit] = useState(1)
  const [selectedBatch, setSelectedBatch] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(null)
  const [shuffledBatchWords, setShuffledBatchWords] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [userSelfEval, setUserSelfEval] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  useEffect(() => {
    shuffleBatchWords()
  }, [selectedUnit, selectedBatch])

  const shuffleBatchWords = () => {
    const words = unitsData[selectedUnit]
    const batchSize = 20
    const startIndex = selectedBatch * batchSize
    const endIndex = Math.min(startIndex + batchSize, words.length)
    const batchWords = words.slice(startIndex, endIndex)

    // Fisher-Yates shuffle
    const shuffled = [...batchWords]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setShuffledBatchWords(shuffled)
    setCurrentWordIndex(0)
    pickNextWord()
  }

  const pickNextWord = () => {
    if (shuffledBatchWords.length === 0 || currentWordIndex >= shuffledBatchWords.length) {
      setCurrentWord(null)
      return
    }

    setCurrentWord(shuffledBatchWords[currentWordIndex])
    setShowAnswer(false)
    setUserSelfEval(null)
    clearCanvas()
  }

  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    let clientX, clientY
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    const { x, y } = getCoordinates(e)
    setLastX(x)
    setLastY(y)
    
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const { x, y } = getCoordinates(e)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()
    
    setLastX(x)
    setLastY(y)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const checkAnswer = () => {
    setShowAnswer(true)
  }

  const selfEvaluate = (correct) => {
    setUserSelfEval(correct)
    setTotalAttempts(prev => prev + 1)
    if (correct) {
      setScore(prev => prev + 1)
    } else {
      // 틀린 단어를 오답노트에 저장
      const wrongAnswers = JSON.parse(localStorage.getItem('wrongAnswers') || '[]')
      const alreadyExists = wrongAnswers.some(w => w.character === currentWord.character)
      if (!alreadyExists) {
        wrongAnswers.push({
          ...currentWord,
          wrongDate: new Date().toISOString(),
          unit: selectedUnit
        })
        localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers))
      }
    }

    // 1초 후 다음 단어로 이동
    setTimeout(() => {
      nextWord()
    }, 1000)
  }

  const nextWord = () => {
    if (currentWordIndex < shuffledBatchWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1)
      pickNextWord()
    }
  }

  const resetProgress = () => {
    setScore(0)
    setTotalAttempts(0)
    shuffleBatchWords()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
        ✍️ 손글씨 한자 퀴즈
      </h2>

      <div className="mb-4 md:mb-6">
        <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
          단원 선택:
        </label>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(unit => (
            <button
              key={unit}
              onClick={() => {
                setSelectedUnit(unit)
                setSelectedBatch(0)
              }}
              className={`flex-1 px-3 py-3 md:px-4 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                selectedUnit === unit
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {unit}단원
            </button>
          ))}
        </div>

        {(() => {
          const words = unitsData[selectedUnit]
          const totalBatches = Math.ceil(words.length / 20)
          if (totalBatches > 1) {
            return (
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  세트 선택 (20개씩):
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: totalBatches }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedBatch(i)}
                      className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold transition-colors text-sm md:text-base ${
                        selectedBatch === i
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}세트
                    </button>
                  ))}
                </div>
              </div>
            )
          }
          return null
        })()}
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-700">
            <span className="font-semibold">진행:</span> {currentWordIndex + 1} / {shuffledBatchWords.length}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">점수:</span> {score} / {totalAttempts}
          </div>
        </div>

        {currentWord && (
          <div className="text-center">
            <p className="text-gray-600 mb-2">이 병음의 한자를 써보세요:</p>
            <p className="text-5xl font-bold text-indigo-800 mb-2">{currentWord.pinyin}</p>
            {showAnswer && (
              <div className="mt-4">
                <p className="text-2xl font-bold text-green-600 chinese-handwriting">{currentWord.character}</p>
                <p className="text-gray-600">{currentWord.meaning}</p>
                {!userSelfEval && (
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      onClick={() => selfEvaluate(true)}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      ✅ 맞았어요
                    </button>
                    <button
                      onClick={() => selfEvaluate(false)}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      ❌ 틀렸어요
                    </button>
                  </div>
                )}
                {userSelfEval !== null && (
                  <div className="mt-4">
                    {userSelfEval ? (
                      <p className="text-green-600 font-semibold">🎉 정답입니다!</p>
                    ) : (
                      <div>
                        <p className="text-red-600 font-semibold mb-2">❌ 틀렸습니다</p>
                        <p className="text-gray-600 text-sm">정답: {currentWord.character} ({currentWord.meaning})</p>
                        <p className="text-gray-500 text-sm mt-1">다음에 다시 써보세요!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-48 md:h-64 border-4 border-gray-300 rounded-xl bg-white cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={clearCanvas}
          className="flex-1 px-4 py-4 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
        >
          🗑️ 지우기
        </button>
        {!showAnswer ? (
          <button
            onClick={checkAnswer}
            className="flex-1 px-4 py-4 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
          >
            정답 확인
          </button>
        ) : (
          <button
            onClick={nextWord}
            className="flex-1 px-4 py-4 md:px-6 md:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
          >
            다음 문제 →
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        💡 병음을 보고 한자를 써보세요! 정답 확인 버튼을 누르면 정답을 볼 수 있습니다.
      </div>
    </div>
  )
}

// WrongAnswerNote Component
function WrongAnswerNote() {
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [reviewIndex, setReviewIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    loadWrongAnswers()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [reviewMode])

  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    let clientX, clientY
    
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    setIsDrawing(true)
    const { x, y } = getCoordinates(e)
    setLastX(x)
    setLastY(y)
    
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const { x, y } = getCoordinates(e)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()
    
    setLastX(x)
    setLastY(y)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const loadWrongAnswers = () => {
    const stored = localStorage.getItem('wrongAnswers')
    if (stored) {
      setWrongAnswers(JSON.parse(stored))
    }
  }

  const removeFromWrongAnswers = (character) => {
    const updated = wrongAnswers.filter(w => w.character !== character)
    setWrongAnswers(updated)
    localStorage.setItem('wrongAnswers', JSON.stringify(updated))
    if (reviewIndex >= updated.length) {
      setReviewIndex(Math.max(0, updated.length - 1))
    }
  }

  const clearAllWrongAnswers = () => {
    if (confirm('모든 오답노트를 삭제하시겠습니까?')) {
      setWrongAnswers([])
      localStorage.removeItem('wrongAnswers')
      setReviewIndex(0)
      setReviewMode(false)
    }
  }

  const startReview = () => {
    setReviewMode(true)
    setReviewIndex(0)
    setShowAnswer(false)
    setTimeout(() => {
      clearCanvas()
    }, 100)
  }

  const exitReview = () => {
    setReviewMode(false)
    setShowAnswer(false)
  }

  const nextReview = () => {
    if (reviewIndex < wrongAnswers.length - 1) {
      setReviewIndex(prev => prev + 1)
      setShowAnswer(false)
      clearCanvas()
    }
  }

  const prevReview = () => {
    if (reviewIndex > 0) {
      setReviewIndex(prev => prev - 1)
      setShowAnswer(false)
      clearCanvas()
    }
  }

  if (reviewMode && wrongAnswers.length > 0) {
    const currentWord = wrongAnswers[reviewIndex]
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 오답노트 복습
        </h2>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-2">이 병음의 한자를 써보세요:</p>
            <p className="text-5xl font-bold text-indigo-800 mb-2">{currentWord.pinyin}</p>
            {showAnswer && (
              <div className="mt-4">
                <p className="text-2xl font-bold text-green-600 chinese-handwriting">{currentWord.character}</p>
                <p className="text-gray-600">{currentWord.meaning}</p>
                <p className="text-gray-500 text-sm mt-1">{currentWord.unit}단원</p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <canvas
            ref={canvasRef}
            className="w-full h-48 md:h-64 border-4 border-gray-300 rounded-xl bg-white cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={clearCanvas}
            className="flex-1 px-4 py-4 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
          >
            🗑️ 지우기
          </button>
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="flex-1 px-4 py-4 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors text-sm md:text-base"
            >
              정답 확인
            </button>
          ) : (
            <>
              <button
                onClick={() => removeFromWrongAnswers(currentWord.character)}
                className="flex-1 px-3 py-4 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors text-xs md:text-base"
              >
                ✅ 완벽
              </button>
              <button
                onClick={() => removeFromWrongAnswers(currentWord.character)}
                className="flex-1 px-3 py-4 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-xs md:text-base"
              >
                ❌ 어려워
              </button>
            </>
          )}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={prevReview}
            disabled={reviewIndex === 0}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            ← 이전
          </button>
          <button
            onClick={nextReview}
            disabled={reviewIndex === wrongAnswers.length - 1}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            다음 →
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={exitReview}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
          >
            복습 종료
          </button>
        </div>

        <div className="text-center text-gray-500 mt-4">
          {reviewIndex + 1} / {wrongAnswers.length}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📝 오답노트
      </h2>

      {wrongAnswers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">아직 틀린 단어가 없습니다!</p>
          <p className="text-gray-400">손글씨 연습에서 틀린 단어가 여기에 저장됩니다.</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700">
              총 <span className="font-bold text-indigo-600">{wrongAnswers.length}</span>개의 틀린 단어
            </p>
            <button
              onClick={clearAllWrongAnswers}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              전체 삭제
            </button>
          </div>

          <div className="mb-6">
            <button
              onClick={startReview}
              className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              📝 복습 시작
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {wrongAnswers.map((word, index) => (
              <div
                key={word.character}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-indigo-800">{word.character}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{word.pinyin}</p>
                    <p className="text-sm text-gray-600">{word.meaning}</p>
                    <p className="text-xs text-gray-400">{word.unit}단원</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromWrongAnswers(word.character)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('vocabulary')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          🇨🇳 중국어 공부 앱
        </h1>
        
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'vocabulary'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            📚 중단어
          </button>
          <button
            onClick={() => setActiveTab('grammar')}
            className={`px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'grammar'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            ✏️ 문법
          </button>
          <button
            onClick={() => setActiveTab('handwriting')}
            className={`px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'handwriting'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            }`}
          >
            ✍️ 손글씨 연습
          </button>
          <button
            onClick={() => setActiveTab('wrongnote')}
            className={`px-5 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'wrongnote'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-red-50'
            }`}
          >
            📝 오답노트
          </button>
        </div>

        {activeTab === 'vocabulary' && <Vocabulary />}
        {activeTab === 'grammar' && <Grammar />}
        {activeTab === 'handwriting' && <HandwritingCanvas />}
        {activeTab === 'wrongnote' && <WrongAnswerNote />}
      </div>
    </div>
  )
}

export default App
