import React, { useState } from 'react';
import { PenTool, Save, Check } from 'lucide-react';
import { DesignData } from '../types.ts';

interface DesignFormProps {
  onSave: (data: DesignData) => void;
}

export const DesignForm: React.FC<DesignFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<DesignData>({
    s1_diameter: 0,
    s2_diameter: 0,
    frameMaterial: 'bia',
    jointCount: 3,
    notes: ''
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-teal-500">
        <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center">
          <PenTool className="w-6 h-6 mr-2" />
          Phiếu Đề Xuất Thiết Kế Sơ Bộ
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cylinder Selection */}
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
            <h3 className="font-semibold text-teal-800 mb-3">1. Hệ thống Thủy lực (Xilanh/Ống tiêm)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đường kính Xilanh điều khiển (S1) - mm</label>
                <input 
                  type="number" 
                  required
                  min="5" max="50"
                  className="w-full border-gray-300 rounded-md p-2 border focus:ring-teal-500 focus:border-teal-500"
                  placeholder="VD: 10"
                  value={formData.s1_diameter || ''}
                  onChange={e => setFormData({...formData, s1_diameter: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đường kính Xilanh chấp hành (S2) - mm</label>
                <input 
                  type="number" 
                  required
                  min="5" max="50"
                  className="w-full border-gray-300 rounded-md p-2 border focus:ring-teal-500 focus:border-teal-500"
                  placeholder="VD: 20"
                  value={formData.s2_diameter || ''}
                  onChange={e => setFormData({...formData, s2_diameter: Number(e.target.value)})}
                />
              </div>
            </div>
            <p className="text-xs text-teal-600 mt-2 italic">Lưu ý: Để lực mạnh, S2 nên lớn hơn S1.</p>
          </div>

          {/* Structural Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">2. Vật liệu khung chính</label>
              <select 
                className="w-full border-gray-300 rounded-md p-2 border bg-white focus:ring-teal-500 focus:border-teal-500"
                value={formData.frameMaterial}
                onChange={e => setFormData({...formData, frameMaterial: e.target.value})}
              >
                <option value="bia">Bìa Carton cứng (Rẻ, dễ gia công)</option>
                <option value="que">Que kem (Khá cứng, thẩm mỹ)</option>
                <option value="formex">Bìa Formex (Cứng, không thấm nước)</option>
                <option value="hon_hop">Hỗn hợp (Kết hợp các loại)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">3. Số bậc tự do (Số khớp)</label>
              <select 
                className="w-full border-gray-300 rounded-md p-2 border bg-white focus:ring-teal-500 focus:border-teal-500"
                value={formData.jointCount}
                onChange={e => setFormData({...formData, jointCount: Number(e.target.value)})}
              >
                <option value="2">2 Khớp (Nâng + Kẹp)</option>
                <option value="3">3 Khớp (Xoay + Nâng + Kẹp)</option>
                <option value="4">4 Khớp (Xoay + Vai + Khuỷu + Kẹp)</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">4. Ghi chú thêm về ý tưởng</label>
            <textarea 
              rows={3}
              className="w-full border-gray-300 rounded-md p-2 border focus:ring-teal-500 focus:border-teal-500"
              placeholder="VD: Sử dụng dây rút để cố định ống tiêm..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>

          <div className="flex items-center justify-end pt-4">
            {saved && <span className="text-green-600 font-bold mr-4 flex items-center animate-pulse"><Check className="w-5 h-5 mr-1" /> Đã lưu bản nháp!</span>}
            <button 
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Hoàn thành Đề xuất
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};