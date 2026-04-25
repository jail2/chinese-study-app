import { useState } from 'react'

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
  const [grammar] = useState(sampleGrammar)

  const currentGrammar = grammar[currentIndex]

  const checkSentence = () => {
    if (userSentence.trim() === '') {
      setFeedback({ type: 'warning', message: '문장을 입력해주세요!' })
      return
    }
    
    setFeedback({ type: 'success', message: '좋은 문장입니다! 계속 연습해보세요.' })
    setUserSentence('')
  }

  const nextPattern = () => {
    setCurrentIndex((prev) => (prev + 1) % grammar.length)
    setUserSentence('')
    setFeedback(null)
  }

  const prevPattern = () => {
    setCurrentIndex((prev) => (prev - 1 + grammar.length) % grammar.length)
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
          {currentIndex + 1} / {grammar.length}
        </span>
      </div>
    </div>
  )
}

export default Grammar
