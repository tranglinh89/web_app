import React, { useState } from 'react';
import { Settings, Check, X, Grip, ArrowUpFromLine, RotateCw } from 'lucide-react';

interface JointType {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const JOINTS: JointType[] = [
  { id: 'rotate', name: 'Khớp Xoay (Base)', desc: 'Giúp cánh tay quay trái/phải quanh trục đế.', icon: <RotateCw className="w-6 h-6" /> },
  { id: 'lift', name: 'Khớp Nâng/Hạ (Arm)', desc: 'Giúp cánh tay di chuyển lên cao hoặc xuống thấp.', icon: <ArrowUpFromLine className="w-6 h-6" /> },
  { id: 'grip', name: 'Khớp Kẹp (Claw)', desc: 'Dùng để nắm, giữ và thả vật thể.', icon: <Grip className="w-6 h-6" /> },
];

export const MechanicsModule: React.FC = () => {
  // Matching Game State
  const [selectedJoint, setSelectedJoint] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({}); // jointId -> descId (using desc as ID for simplicity here)

  // Material Selection State
  const [materialAnswers, setMaterialAnswers] = useState({
    strength: '',
    cost: '',
    workability: ''
  });
  const [showMatResult, setShowMatResult] = useState(false);

  const handleDragStart = (e: React.DragEvent, jointId: string) => {
    e.dataTransfer.setData('jointId', jointId);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    const jointId = e.dataTransfer.getData('jointId');
    setMatches(prev => ({ ...prev, [targetId]: jointId }));
  };

  const checkMaterialResults = () => {
    setShowMatResult(true);
  };

  const getMatStyle = (type: 'strength'|'cost'|'workability', val: string) => {
      if (!showMatResult) return 'bg-white border-gray-200';
      // Correct answers: Strength->Plywood(van_ep), Cost->Cardboard(bia), Work->Cardboard/Popsicle(bia/que)
      // Simplifying for this demo:
      // Strength: Ván ép
      // Cost: Bìa Carton
      // Work: Bìa Carton
      
      const correctMap = {
          strength: 'van_ep',
          cost: 'bia',
          workability: 'bia'
      };

      if (val === correctMap[type]) return 'bg-green-100 border-green-500 text-green-800';
      return 'bg-red-50 border-red-300 text-red-800';
  };

  return (
    <div className="space-y-10 animate-fadeIn">
       {/* Theory: Joints */}
       <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
          <span className="bg-purple-100 text-purple-600 py-1 px-3 rounded-lg text-sm mr-3">Phần 2</span>
          Cơ cấu & Vật liệu
        </h2>

        <div className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" /> Hoạt động 1: Hiểu về Khớp nối
            </h3>
            <p className="text-sm text-gray-500 mb-4">Kéo tên khớp thả vào ô mô tả tương ứng (hoặc chọn trên mobile).</p>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* Draggables */}
                <div className="space-y-3">
                    <p className="font-medium text-gray-400 text-sm uppercase">Nguồn (Kéo từ đây)</p>
                    {JOINTS.map(j => (
                        <div 
                            key={j.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, j.id)}
                            className="bg-purple-50 p-3 rounded-lg border border-purple-200 cursor-move hover:bg-purple-100 flex items-center font-medium text-purple-900 shadow-sm"
                        >
                            <span className="bg-white p-1 rounded mr-3 text-purple-600">{j.icon}</span>
                            {j.name}
                        </div>
                    ))}
                </div>

                {/* Droppables */}
                <div className="space-y-3">
                     <p className="font-medium text-gray-400 text-sm uppercase">Đích (Thả vào đây)</p>
                     {JOINTS.map((j) => (
                         <div 
                            key={j.desc}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, j.id)}
                            className={`p-4 rounded-lg border-2 border-dashed transition-colors flex items-center justify-between
                                ${matches[j.id] === j.id ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}
                            `}
                         >
                            <span className="text-sm text-gray-600 flex-1">{j.desc}</span>
                            {matches[j.id] ? (
                                matches[j.id] === j.id ? (
                                    <Check className="text-green-600 ml-2" />
                                ) : (
                                    <X className="text-red-500 ml-2" />
                                )
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gray-200 ml-2 border border-gray-300"></div>
                            )}
                         </div>
                     ))}
                </div>
            </div>
            <p className="text-xs text-center mt-2 text-gray-400 italic">Mẹo: Trên máy tính, hãy dùng chuột kéo thả.</p>
        </div>

        <div className="border-t border-gray-100 my-8"></div>

        {/* Materials */}
        <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" /> Hoạt động 2: Lựa chọn vật liệu
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Tiêu chí</th>
                            <th className="px-4 py-3">Lựa chọn của bạn</th>
                            <th className="px-4 py-3 rounded-r-lg">Kết quả</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-4 font-medium text-gray-900">Độ cứng vững cao nhất</td>
                            <td className="px-4 py-4">
                                <select 
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-purple-500 focus:border-purple-500"
                                    onChange={(e) => setMaterialAnswers({...materialAnswers, strength: e.target.value})}
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="bia">Bìa Carton</option>
                                    <option value="que">Que kem</option>
                                    <option value="van_ep">Ván ép (Gỗ mỏng)</option>
                                </select>
                            </td>
                            <td className="px-4 py-4">
                                {showMatResult && (
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getMatStyle('strength', materialAnswers.strength)}`}>
                                        {materialAnswers.strength === 'van_ep' ? 'Đúng (Gỗ cứng nhất)' : 'Sai'}
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <td className="px-4 py-4 font-medium text-gray-900">Chi phí thấp nhất (dễ kiếm)</td>
                            <td className="px-4 py-4">
                                <select 
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-purple-500 focus:border-purple-500"
                                    onChange={(e) => setMaterialAnswers({...materialAnswers, cost: e.target.value})}
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="bia">Bìa Carton</option>
                                    <option value="que">Que kem</option>
                                    <option value="van_ep">Ván ép</option>
                                </select>
                            </td>
                            <td className="px-4 py-4">
                                 {showMatResult && (
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getMatStyle('cost', materialAnswers.cost)}`}>
                                        {materialAnswers.cost === 'bia' ? 'Đúng (Tận dụng vỏ hộp)' : 'Chưa tối ưu'}
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-4 py-4 font-medium text-gray-900">Dễ gia công (cắt/dán) nhất</td>
                            <td className="px-4 py-4">
                                <select 
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-purple-500 focus:border-purple-500"
                                    onChange={(e) => setMaterialAnswers({...materialAnswers, workability: e.target.value})}
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="bia">Bìa Carton</option>
                                    <option value="que">Que kem</option>
                                    <option value="van_ep">Ván ép</option>
                                </select>
                            </td>
                            <td className="px-4 py-4">
                                {showMatResult && (
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getMatStyle('workability', materialAnswers.workability)}`}>
                                        {materialAnswers.workability === 'bia' ? 'Đúng (Dùng kéo cắt được)' : 'Khó hơn'}
                                    </span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-4 text-right">
                    <button 
                        onClick={checkMaterialResults}
                        className="text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                    >
                        Kiểm tra Đáp án
                    </button>
                </div>
            </div>
        </div>
       </div>
    </div>
  );
};