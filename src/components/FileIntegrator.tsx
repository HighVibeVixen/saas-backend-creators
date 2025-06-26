import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, FileText, Image, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  name: string;
  path: string;
  size: number;
  type: string;
  content?: string;
}

interface FileIntegratorProps {
  files: FileItem[];
  onIntegrate: (integratedFiles: FileItem[]) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'tsx':
    case 'ts':
    case 'js':
    case 'jsx':
      return <Code className="h-4 w-4" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'svg':
      return <Image className="h-4 w-4" />;
    case 'json':
    case 'md':
    case 'txt':
      return <FileText className="h-4 w-4" />;
    default:
      return <Settings className="h-4 w-4" />;
  }
};

const getFileCategory = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (['tsx', 'ts', 'js', 'jsx'].includes(ext || '')) return 'components';
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext || '')) return 'assets';
  if (['json', 'md', 'txt'].includes(ext || '')) return 'config';
  return 'other';
};

export const FileIntegrator: React.FC<FileIntegratorProps> = ({ files, onIntegrate }) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [integrationStatus, setIntegrationStatus] = useState<Record<string, 'pending' | 'success' | 'error'>>({});
  const { toast } = useToast();

  const categorizedFiles = files.reduce((acc, file) => {
    const category = getFileCategory(file.name);
    if (!acc[category]) acc[category] = [];
    acc[category].push(file);
    return acc;
  }, {} as Record<string, FileItem[]>);

  const toggleFileSelection = (filePath: string) => {
    setSelectedFiles(prev => 
      prev.includes(filePath) 
        ? prev.filter(p => p !== filePath)
        : [...prev, filePath]
    );
  };

  const selectAllInCategory = (category: string) => {
    const categoryFiles = categorizedFiles[category]?.map(f => f.path) || [];
    setSelectedFiles(prev => [...new Set([...prev, ...categoryFiles])]);
  };

  const handleIntegration = async () => {
    const filesToIntegrate = files.filter(f => selectedFiles.includes(f.path));
    
    setIntegrationStatus({});
    
    for (const file of filesToIntegrate) {
      setIntegrationStatus(prev => ({ ...prev, [file.path]: 'pending' }));
      
      // Simulate integration process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple validation - check if file content exists
      const status = file.content && file.content.length > 0 ? 'success' : 'error';
      setIntegrationStatus(prev => ({ ...prev, [file.path]: status }));
    }

    const successCount = Object.values(integrationStatus).filter(s => s === 'success').length;
    
    toast({
      title: "Integration Complete!",
      description: `${successCount} files integrated successfully`
    });

    onIntegrate(filesToIntegrate);
  };

  const renderFileList = (categoryFiles: FileItem[], category: string) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium capitalize">{category} Files</h4>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => selectAllInCategory(category)}
        >
          Select All
        </Button>
      </div>
      <ScrollArea className="h-40">
        <div className="space-y-1">
          {categoryFiles.map((file, index) => {
            const isSelected = selectedFiles.includes(file.path);
            const status = integrationStatus[file.path];
            
            return (
              <div 
                key={index} 
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                  isSelected ? 'bg-primary/10 border border-primary' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => toggleFileSelection(file.path)}
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(file.name)}
                  <span className="text-sm truncate">{file.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {(file.size / 1024).toFixed(1)}KB
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                  {status === 'pending' && <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>File Integration Manager</CardTitle>
        <p className="text-sm text-gray-600">
          Review and select files to integrate with your platform
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          {Object.entries(categorizedFiles).map(([category, categoryFiles]) => (
            <TabsContent key={category} value={category}>
              {renderFileList(categoryFiles, category)}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {selectedFiles.length} files selected for integration
          </p>
          <Button 
            onClick={handleIntegration}
            disabled={selectedFiles.length === 0}
            className="min-w-32"
          >
            Integrate Selected
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};