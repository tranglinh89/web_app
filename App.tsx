import React, { useState } from 'react';
import { AppStep, DesignData } from './types.ts';
import { PascalModule } from './components/PascalModule.tsx';
import { MechanicsModule } from './components/MechanicsModule.tsx';
import { DesignForm } from './components/DesignForm.tsx';
import { BookOpen, Cog, FileText, ChevronRight, Beaker, Printer } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.INTRO);
  const [designData, setDesignData] = useState<DesignData | null>(null);

  const handleDesignSave = (data: DesignData) => {
    setDesignData(data);
    setCurrentStep(AppStep.SUMMARY);
  };

  const renderContent = () => {
    switch (currentStep) {
      case AppStep.INTRO:
        return (
          <div className="text-center max-w-3xl mx-auto py-12 animate-fadeIn">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-t-8 border-indigo-500">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Dự án STEM: Cánh tay Robot Thủy lực
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Hoạt động 2: Nghiên cứu Kiến thức Nền & Đề xuất Giải pháp
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="bg-blue-200 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <Beaker className="text-blue-700 w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-800">Khoa học</h3>
                  <p className="text-sm text-gray-600">Nguyên lý Pascal & áp suất chất lỏng.</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="bg-purple-200 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <Cog className="text-purple-700 w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-800">Kỹ thuật</h3>
                  <p className="text-sm text-gray-600">Cơ cấu khớp nối & Vật liệu chế tạo.</p>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
                  <div className="bg-teal-200 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                    <FileText className="text-teal-700 w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-800">Thiết kế</h3>
                  <p className="text-sm text-gray-600">Đề xuất giải pháp robot của nhóm bạn.</p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentStep(AppStep.PASCAL)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center mx-auto"
              >
                Bắt đầu bài học <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        );
      case AppStep.PASCAL:
        return <PascalModule />;
      case AppStep.MECHANICS:
        return <MechanicsModule />;
      case AppStep.DESIGN:
        return <DesignForm onSave={handleDesignSave} />;
      case AppStep.SUMMARY:
        return (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-gray-300 animate-fadeIn print:shadow-none print:border-none print:w-full print:max-w-none">
            <div className="text-center border-b pb-6 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">PHIẾU ĐỀ XUẤT THIẾT KẾ</h2>
              <p className="text-gray-500 uppercase tracking-wider mt-2">Dự án STEM: Robot Thủy Lực</p>
            </div>
            
            <div className="space-y-6 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg print:bg-white print:border print:border-gray-200">
                <h3 className="text-teal-700 font-bold mb-3 border-b border-gray-200 pb-2">1. Hệ thống truyền động</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <span className="block text-sm text-gray-500">Xilanh điều khiển (S1):</span>
                      <span className="font-mono text-lg font-bold">{designData?.s1_diameter} mm</span>
                   </div>
                   <div>
                      <span className="block text-sm text-gray-500">Xilanh chấp hành (S2):</span>
                      <span className="font-mono text-lg font-bold">{designData?.s2_diameter} mm</span>
                   </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg print:bg-white print:border print:border-gray-200">
                <h3 className="text-purple-700 font-bold mb-3 border-b border-gray-200 pb-2">2. Kết cấu cơ khí</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <span className="block text-sm text-gray-500">Vật liệu chính:</span>
                      <span className="font-semibold text-lg">
                        {designData?.frameMaterial === 'bia' && 'Bìa Carton cứng'}
                        {designData?.frameMaterial === 'que' && 'Que kem'}
                        {designData?.frameMaterial === 'formex' && 'Bìa Formex'}
                        {designData?.frameMaterial === 'hon_hop' && 'Hỗn hợp'}
                      </span>
                   </div>
                   <div>
                      <span className="block text-sm text-gray-500">Số bậc tự do:</span>
                      <span className="font-semibold text-lg">{designData?.jointCount} Khớp</span>
                   </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg print:bg-white print:border print:border-gray-200">
                <h3 className="text-gray-700 font-bold mb-2 border-b border-gray-200 pb-2">3. Ghi chú ý tưởng</h3>
                <p className="italic text-gray-600 min-h-[60px] whitespace-pre-wrap">{designData?.notes || 'Không có ghi chú thêm.'}</p>
              </div>
            </div>

            <div className="mt-8 text-center print:hidden">
              <p className="text-sm text-gray-500 mb-4">Nhấn nút bên dưới để lưu phiếu về máy (PDF) hoặc in ra giấy nộp cho giáo viên.</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => window.print()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors flex items-center"
                >
                  <Printer className="w-5 h-5 mr-2" />
                  Lưu PDF / In Phiếu
                </button>
                <button 
                  onClick={() => setCurrentStep(AppStep.INTRO)}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
                >
                  Làm lại
                </button>
              </div>
            </div>
            
            <div className="hidden print:block mt-12 text-center text-sm text-gray-400">
                <p>HydraLearn STEM Application - Lớp 8</p>
                <p>Ngày in: {new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        );
      default:
        return <div>Nội dung không tồn tại</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 print:bg-white">
      {/* Header - Hidden on Print */}
      <header className="bg-white shadow-sm sticky top-0 z-30 print:hidden">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-indigo-700 text-xl">
                <Beaker className="w-6 h-6" />
                <span>HydraLearn</span>
            </div>
            
            {/* Nav Steps */}
            {currentStep !== AppStep.INTRO && (
                <div className="hidden md:flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    {[
                        {id: AppStep.PASCAL, label: '1. Pascal', icon: BookOpen},
                        {id: AppStep.MECHANICS, label: '2. Cơ cấu', icon: Cog},
                        {id: AppStep.DESIGN, label: '3. Thiết kế', icon: FileText}
                    ].map(step => (
                        <button
                            key={step.id}
                            onClick={() => setCurrentStep(step.id)}
                            className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                currentStep === step.id 
                                ? 'bg-white text-indigo-700 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            <step.icon className="w-4 h-4 mr-1.5" />
                            {step.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full print:p-0">
        {renderContent()}
      </main>

      {/* Footer Navigation (Mobile) - Hidden on Print */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around z-20 print:hidden">
         <button onClick={() => setCurrentStep(AppStep.PASCAL)} className={`p-2 rounded ${currentStep === AppStep.PASCAL ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}><BookOpen/></button>
         <button onClick={() => setCurrentStep(AppStep.MECHANICS)} className={`p-2 rounded ${currentStep === AppStep.MECHANICS ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}><Cog/></button>
         <button onClick={() => setCurrentStep(AppStep.DESIGN)} className={`p-2 rounded ${currentStep === AppStep.DESIGN ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}><FileText/></button>
      </div>
    </div>
  );
};

export default App;