import React, { useState } from 'react';
import { FolderUpload } from './FolderUpload';
import { FileIntegrator } from './FileIntegrator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Upload, Settings, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  name: string;
  path: string;
  size: number;
  type: string;
  content?: string;
}

type Step = 'upload' | 'integrate' | 'complete';

export const UploadManager: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([]);
  const [integratedFiles, setIntegratedFiles] = useState<FileItem[]>([]);
  const { toast } = useToast();

  const handleFilesUploaded = (files: FileItem[]) => {
    setUploadedFiles(files);
    setCurrentStep('integrate');
  };

  const handleFilesIntegrated = (files: FileItem[]) => {
    setIntegratedFiles(files);
    setCurrentStep('complete');
    
    toast({
      title: "🎉 Integration Complete!",
      description: "Your files have been successfully integrated with the platform"
    });
  };

  const resetProcess = () => {
    setCurrentStep('upload');
    setUploadedFiles([]);
    setIntegratedFiles([]);
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'upload': return 33;
      case 'integrate': return 66;
      case 'complete': return 100;
      default: return 0;
    }
  };

  const StepIndicator = ({ step, label, icon, active, completed }: {
    step: Step;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    completed: boolean;
  }) => (
    <div className="flex flex-col items-center space-y-2">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        completed ? 'bg-green-500 text-white' : 
        active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
      }`}>
        {completed ? <CheckCircle className="h-6 w-6" /> : icon}
      </div>
      <span className={`text-sm font-medium ${
        active || completed ? 'text-primary' : 'text-gray-500'
      }`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Integration Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your project folder and seamlessly integrate it with our platform for the ultimate user experience
          </p>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <StepIndicator 
                step="upload" 
                label="Upload" 
                icon={<Upload className="h-6 w-6" />}
                active={currentStep === 'upload'}
                completed={currentStep !== 'upload'}
              />
              <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: currentStep === 'upload' ? '0%' : '100%' }}
                />
              </div>
              <StepIndicator 
                step="integrate" 
                label="Integrate" 
                icon={<Settings className="h-6 w-6" />}
                active={currentStep === 'integrate'}
                completed={currentStep === 'complete'}
              />
              <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: currentStep === 'complete' ? '100%' : '0%' }}
                />
              </div>
              <StepIndicator 
                step="complete" 
                label="Complete" 
                icon={<Sparkles className="h-6 w-6" />}
                active={currentStep === 'complete'}
                completed={false}
              />
            </div>
            <Progress value={getStepProgress()} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 'upload' && (
            <FolderUpload onUpload={handleFilesUploaded} />
          )}

          {currentStep === 'integrate' && (
            <FileIntegrator 
              files={uploadedFiles} 
              onIntegrate={handleFilesIntegrated} 
            />
          )}

          {currentStep === 'complete' && (
            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">Integration Successful!</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your project has been successfully integrated with our platform. 
                    {integratedFiles.length} files have been processed and are now part of your application.
                  </p>
                  <div className="flex gap-4 justify-center mt-6">
                    <Button onClick={resetProcess} variant="outline">
                      Upload Another Project
                    </Button>
                    <Button onClick={() => window.location.href = '/'}>
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};