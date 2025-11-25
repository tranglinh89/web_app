import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export const PascalModule: React.FC = () => {
  const [f1, setF1] = useState<number>(10); // Newton
  const [s1, setS1] = useState<number>(2);  // cm2
  const [s2, setS2] = useState<number>(10); // cm2
  const [f2, setF2] = useState<number>(0);

  // Challenge State
  const [challengeAnswer, setChallengeAnswer] = useState<string>('');
  const [challengeResult, setChallengeResult] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    // F2 = F1 * (S2 / S1)
    if (s1 > 0) {
      setF2(parseFloat((f1 * (s2 / s1)).toFixed(2)));
    }
  }, [f1, s1, s2]);

  const checkChallenge = () => {
    const val = parseFloat(challengeAnswer);
    if (val === 5) {
      setChallengeResult('correct');
    } else {
      setChallengeResult('incorrect');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Theory Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-lg text-sm mr-3">Phần 1</span>
          Nguyên lý Pascal
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          "Độ tăng áp suất lên một chất lỏng chứa trong bình kín được truyền đi 
          <strong> nguyên vẹn</strong> đến mọi điểm của chất lỏng và thành bình."
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Công thức máy nén thủy lực:</h3>
          <div className="flex items-center justify-center space-x-4 text-xl font-mono text-indigo-700">
            <div>
              <div className="text-center border-b-2 border-indigo-700">F<sub>2</sub></div>
              <div className="text-center">S<sub>2</sub></div>
            </div>
            <span>=</span>
            <div>
              <div className="text-center border-b-2 border-indigo-700">F<sub>1</sub></div>
              <div className="text-center">S<sub>1</sub></div>
            </div>
            <span>&rArr;</span>
            <span>F<sub>2</sub> = F<sub>1</sub> &times; (S<sub>2</sub> / S<sub>1</sub>)</span>
          </div>
        </div>
      </div>

      {/* Simulator Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <Calculator className="w-5 h-5 text-indigo-500 mr-2" />
            <h3 className="text-lg font-bold text-gray-800">Mô phỏng tính toán</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lực tác dụng F1 (N)</label>
              <input 
                type="number" 
                value={f1}
                onChange={(e) => setF1(Number(e.target.value))}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích S1 (cm²)</label>
                <input 
                  type="number" 
                  value={s1}
                  onChange={(e) => setS1(Number(e.target.value))}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích S2 (cm²)</label>
                <input 
                  type="number" 
                  value={s2}
                  onChange={(e) => setS2(Number(e.target.value))}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visualization & Result */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-xl shadow-lg text-white flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             {/* Decorative Background bubbles */}
             <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white"></div>
             <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-white"></div>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 relative z-10">Lực đầu ra (F2)</h3>
          <div className="text-5xl font-bold mb-4 relative z-10">
            {f2} <span className="text-2xl font-normal">N</span>
          </div>
          <div className="text-indigo-100 text-center relative z-10">
            Tỉ lệ khuếch đại lực: <span className="font-bold text-white">{(s2/s1).toFixed(1)} lần</span>
          </div>
          
          {/* Simple Visual Bar Comparison */}
          <div className="mt-6 flex items-end space-x-4 h-32 w-full justify-center relative z-10">
            <div className="flex flex-col items-center group">
              <span className="text-xs mb-1 opacity-80">F1</span>
              <div 
                className="w-12 bg-yellow-400 rounded-t-md transition-all duration-500"
                style={{ height: `${Math.min((f1 / (f1+f2 || 1)) * 100, 100)}%`, minHeight: '10px' }}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs mb-1 opacity-80">F2</span>
              <div 
                className="w-16 bg-green-400 rounded-t-md transition-all duration-500 shadow-lg"
                style={{ height: `${Math.min((f2 / (f1+f2 || 1)) * 100, 100)}%`, minHeight: '10px' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Thử thách nhanh
        </h3>
        <p className="text-gray-700 mb-4">
          Để nâng một vật nặng <strong>500 gram</strong> chỉ bằng một lực ấn tương đương <strong>100 gram</strong>, 
          bạn cần tỉ lệ diện tích Piston lớn so với Piston nhỏ (S<sub>2</sub>/S<sub>1</sub>) tối thiểu là bao nhiêu?
        </p>
        <div className="flex items-center space-x-3">
          <input 
            type="number" 
            placeholder="Nhập tỉ lệ..."
            value={challengeAnswer}
            onChange={(e) => {
              setChallengeAnswer(e.target.value);
              setChallengeResult(null);
            }}
            className="border border-gray-300 rounded-md p-2 w-40 focus:outline-none focus:border-yellow-500"
          />
          <button 
            onClick={checkChallenge}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
          >
            Kiểm tra
          </button>
          
          {challengeResult === 'correct' && (
            <span className="text-green-600 font-bold flex items-center">
              <CheckCircle className="w-5 h-5 mr-1" /> Chính xác! (5 lần)
            </span>
          )}
          {challengeResult === 'incorrect' && (
             <span className="text-red-500 font-bold">Sai rồi, hãy thử lại (Gợi ý: 500 / 100 = ?)</span>
          )}
        </div>
      </div>
    </div>
  );
};