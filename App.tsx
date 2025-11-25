import React, { useState } from 'react';
import { AppStep, DesignData } from './types';
import { PascalModule } from './components/PascalModule';
import { MechanicsModule } from './components/MechanicsModule';
import { DesignForm } from './components/DesignForm';
import { AITutor } from './components/AITutor';
import { BookOpen, Cog, FileText, ChevronRight, Beaker } from 'lucide-react';

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
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-dashed border-gray-300 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tổng hợp Thiết Kế</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Hệ thống lực:</span>
                <span>{designData?.s1_diameter}mm (S1) &rarr; {designData?.s2_diameter}mm (S2)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Vật liệu khung:</span>
                <span className="uppercase">{designData?.frameMaterial}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Số khớp:</span>
                <span>{designData?.jointCount}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Ghi chú:</h4>
                <p className="italic text-gray-600">{designData?.notes || 'Không có ghi chú'}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button 
                onClick={() => window.print()}
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black mr-4"
              >
                In Phiếu
              </button>
              <button 
                onClick={() => setCurrentStep(AppStep.INTRO)}
                className="text-indigo-600 hover:underline"
              >
                Làm lại từ đầu
              </button>
            </div>
          </div>
        );
      default:
        return <div>Nội dung không tồn tại</div>;
    }
  };

  const getContextString = () => {
      switch(currentStep) {
          case AppStep.PASCAL: return "Học sinh đang học về Nguyên lý Pascal và công thức F2/S2 = F1/S1.";
          case AppStep.MECHANICS: return "Học sinh đang tìm hiểu về các loại khớp (xoay, nâng, kẹp) và vật liệu chế tạo robot.";
          case AppStep.DESIGN: return "Học sinh đang điền phiếu đề xuất thiết kế robot thủy lực.";
          default: return "Giới thiệu chung về dự án.";
      }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
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
      <main className="flex-grow p-4 md:p-8 max-w-5xl mx-auto w-full">
        {renderContent()}
      </main>

      {/* Footer Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t p-2 flex justify-around z-20">
         <button onClick={() => setCurrentStep(AppStep.PASCAL)} className={`p-2 rounded ${currentStep === AppStep.PASCAL ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}><BookOpen/></button>
         <button onClick={() => setCurrentStep(AppStep.MECHANICS)} className={`p-2 rounded ${currentStep === AppStep.MECHANICS ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}><Cog/></button>
         <button onClick={() => setCurrentStep(AppStep.DESIGN)} className={`p-2 rounded ${currentStep === AppStep.DESIGN ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'}`}><FileText/></button>
      </div>

      {/* AI Tutor */}
      <AITutor context={getContextString()} />
    </div>
  );
};

export default App;