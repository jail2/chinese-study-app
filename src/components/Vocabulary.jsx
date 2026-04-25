import { useState } from 'react'

const sampleVocabulary = [
  { chinese: '你好', pinyin: 'nǐ hǎo', korean: '안녕하세요' },
  { chinese: '谢谢', pinyin: 'xiè xie', korean: '감사합니다' },
  { chinese: '再见', pinyin: 'zài jiàn', korean: '안녕히 가세요' },
  { chinese: '学习', pinyin: 'xué xí', korean: '공부하다' },
  { chinese: '朋友', pinyin: 'péng you', korean: '친구' },
]

function Vocabulary() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [vocabulary, setVocabulary] = useState(sampleVocabulary)

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabulary.length)
    setFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + vocabulary.length) % vocabulary.length)
    setFlipped(false)
  }

  const currentWord = vocabulary[currentIndex]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        중단어 플래시카드
      </h2>
      
      <div className="relative h-64 mb-6 cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <div
          className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${
            flipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ${
              flipped ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center text-white">
              <p className="text-5xl font-bold mb-4">{currentWord.chinese}</p>
              <p className="text-2xl text-indigo-200">{currentWord.pinyin}</p>
            </div>
          </div>
          
          <div
            className={`absolute w-full h-full bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg ${
              flipped ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-center text-white">
              <p className="text-5xl font-bold mb-4">{currentWord.korean}</p>
              <p className="text-xl text-green-200">클릭해서 뒤집기</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={prevCard}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
        >
          ← 이전
        </button>
        <button
          onClick={nextCard}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
        >
          다음 →
        </button>
      </div>

      <div className="text-center text-gray-500">
        {currentIndex + 1} / {vocabulary.length}
      </div>
    </div>
  )
}

export default Vocabulary
