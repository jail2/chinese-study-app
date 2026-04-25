import { useRef, useState, useEffect } from 'react'

function HandwritingCanvas() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [targetCharacter, setTargetCharacter] = useState('你')
  const [showHint, setShowHint] = useState(false)

  const sampleCharacters = ['你', '好', '谢', '学', '朋']

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)
    
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

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
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const { x, y } = getCoordinates(e)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const changeCharacter = () => {
    const currentIndex = sampleCharacters.indexOf(targetCharacter)
    const nextIndex = (currentIndex + 1) % sampleCharacters.length
    setTargetCharacter(sampleCharacters[nextIndex])
    clearCanvas()
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ✍️ 손글씨 한자 연습
      </h2>

      <div className="mb-6 text-center">
        <p className="text-gray-600 mb-2">이 한자를 따라 써보세요:</p>
        <div className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6">
          <p className="text-6xl font-bold text-indigo-800">{targetCharacter}</p>
        </div>
        <button
          onClick={changeCharacter}
          className="ml-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
        >
          다음 한자
        </button>
      </div>

      <div className="mb-4">
        <div
          ref={canvasRef}
          className="w-full h-80 border-4 border-gray-300 rounded-xl bg-white cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={clearCanvas}
          className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
        >
          🗑️ 지우기
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
        >
          💡 힌트 {showHint ? '숨기기' : '보기'}
        </button>
      </div>

      {showHint && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-800 font-semibold mb-2">✍️ 쓰기 팁:</p>
          <ul className="text-yellow-700 space-y-1">
            <li>• 획 순서를 지켜서 쓰세요</li>
            <li>• 천천히 정확하게 쓰는 연습을 하세요</li>
            <li>• 규칙적인 간격을 유지하세요</li>
            <li>• 마우스나 터치로 자유롭게 써보세요</li>
          </ul>
        </div>
      )}

      <div className="mt-6 text-center text-gray-500 text-sm">
        💡 마우스나 터치로 직접 써보세요! 휴대폰에서도 작동합니다.
      </div>
    </div>
  )
}

export default HandwritingCanvas
