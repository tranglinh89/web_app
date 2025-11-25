import React, { useState } from 'react';
import { Settings, Check, X, Grip, ArrowUpFromLine, RotateCw, AlertTriangle, RefreshCw } from 'lucide-react';

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

  const handleMaterialChange = (criteria: keyof typeof materialAnswers, value: string) => {
    setMaterialAnswers(prev => ({ ...prev, [criteria]: value }));
    // Reset trạng thái hiển thị kết quả để học sinh có thể thử lại
    setShowMatResult(false);
  };

  // Logic phản hồi chi tiết cho từng lựa chọn
  const getFeedback = (criteria: 'strength' | 'cost' | 'workability', value: string) => {
    if (!showMatResult || !value) return null;

    let isCorrect = false;
    let message = "";

    switch (criteria) {
      case 'strength': 
        if (value === 'formex') {
          isCorrect = true;
          message = "Đúng, Formex rất cứng và chịu nước tốt. Tuy nhiên, khuyến khích bạn ưu tiên dùng **Bìa Carton** để tận dụng vật liệu tái chế (bảo vệ môi trường), tiết kiệm chi phí và dễ tìm kiếm hơn.";
        } else if (value === 'bia') {
          // CẬP NHẬT: Chấp nhận bìa carton nếu là loại cứng
          isCorrect = true;
          message = "Rất tốt! Dù bìa carton mềm hơn gỗ, nhưng nếu chọn loại 'Carton lạnh' hoặc dán chồng 3-4 lớp, nó hoàn toàn đủ cứng để gắp vật nặng.";
        } else if (value === 'que') {
          message = "Chưa tối ưu. Que kem cứng nhưng bản nhỏ, khó ghép thành cánh tay lớn chịu lực.";
        }
        break;

      case 'cost': 
        if (value === 'bia') {
          isCorrect = true;
          message = "Chính xác! Có thể tận dụng vỏ hộp cũ, thùng mì tôm... hoàn toàn miễn phí.";
        } else if (value === 'que') {
          message = "Tạm được. Que kem rẻ nhưng vẫn tốn tiền mua số lượng lớn.";
        } else if (value === 'formex') {
          message = "Không tối ưu về giá. Bìa Formex phải mua ở tiệm văn phòng phẩm, giá cao hơn bìa carton.";
        }
        break;

      case 'workability': 
        if (value === 'bia') {
          isCorrect = true;
          message = "Chính xác! Bìa carton rất dễ cắt, đục lỗ và dán keo.";
        } else if (value === 'formex') {
          isCorrect = true;
          message = "Khá tốt. Formex mềm, dễ cắt bằng dao rọc giấy (tuy nhiên khó hơn bìa carton một chút).";
        } else if (value === 'que') {
          message = "Khó hơn. Cần dùng kìm cắt hoặc dao sắc để cắt ngắn que kem, dễ bị nứt.";
        }
        break;
    }

    return (
      <div className={`mt-2 text-xs p-2 rounded border flex items-start ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'}`}>
        {isCorrect ? <Check className="w-4 h-4 mr-1 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />}
        <span>{message}</span>
      </div>
    );
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
            <p className="text-sm text-gray-500 mb-4 italic">Hãy đóng vai kỹ sư để chọn vật liệu phù hợp nhất cho từng tiêu chí thiết kế.</p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg w-1/3">Tiêu chí</th>
                            <th className="px-4 py-3 w-1/3">Lựa chọn của bạn</th>
                            <th className="px-4 py-3 rounded-r-lg w-1/3">Giải thích</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Strength Row */}
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900 align-top">
                                Độ cứng vững cao nhất
                                <div className="text-xs text-gray-400 font-normal mt-1">Vật liệu làm khung chính chịu lực.</div>
                            </td>
                            <td className="px-4 py-4 align-top">
                                <select 
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-purple-500 focus:border-purple-500"
                                    onChange={(e) => handleMaterialChange('strength', e.target.value)}
                                    value={materialAnswers.strength}
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="bia">Bìa Carton cứng</option>
                                    <option value="que">Que kem</option>
                                    <option value="formex">Bìa Formex (Nhựa xốp)</option>
                                </select>
                            </td>
                            <td className="px-4 py-4 align-top">
                                {getFeedback('strength', materialAnswers.strength)}
                            </td>
                        </tr>

                        {/* Cost Row */}
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900 align-top">
                                Chi phí thấp nhất
                                <div className="text-xs text-gray-400 font-normal mt-1">Dễ tìm kiếm, tận dụng đồ tái chế.</div>
                            </td>
                            <td className="px-4 py-4 align-top">
                                <select 
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-purple-500 focus:border-purple-500"
                                    onChange={(e) => handleMaterialChange('cost', e.target.value)}
                                    value={materialAnswers.cost}
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="bia">Bìa Carton cứng</option>
                                    <option value="que">Que kem</option>
                                    <option value="formex">Bìa Formex</option>
                                </select>
                            </td>
                            <td className="px-4 py-4 align-top">
                                {getFeedback('cost', materialAnswers.cost)}
                            </td>
                        </tr>

                        {/* Workability Row */}
                        <tr className="bg-white hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900 align-top">
                                Dễ gia công nhất
                                <div className="text-xs text-gray-400 font-normal mt-1">Dễ cắt, dán bằng dụng cụ học sinh.</div>
                            </td>
                            <td className="px-4 py-4 align-top">
                                <select 
                                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-purple-500 focus:border-purple-500"
                                    onChange={(e) => handleMaterialChange('workability', e.target.value)}
                                    value={materialAnswers.workability}
                                >
                                    <option value="">-- Chọn --</option>
                                    <option value="bia">Bìa Carton cứng</option>
                                    <option value="que">Que kem</option>
                                    <option value="formex">Bìa Formex</option>
                                </select>
                            </td>
                            <td className="px-4 py-4 align-top">
                                {getFeedback('workability', materialAnswers.workability)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-6 text-right">
                    <button 
                        onClick={checkMaterialResults}
                        className="text-white bg-purple-600 hover:bg-purple-700 shadow-md font-medium rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 focus:outline-none transition-colors flex items-center inline-flex"
                    >
                        {showMatResult ? <RefreshCw className="w-4 h-4 mr-2"/> : null}
                        {showMatResult ? 'Kiểm tra lại' : 'Kiểm tra Đáp án'}
                    </button>
                </div>
            </div>
        </div>
       </div>
    </div>
  );
};