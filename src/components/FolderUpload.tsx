import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FolderOpen, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  name: string;
  path: string;
  size: number;
  type: string;
  content?: string;
}

interface FolderUploadProps {
  onUpload: (files: FileItem[]) => void;
}

export const FolderUpload: React.FC<FolderUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFolderSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileItems: FileItem[] = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const content = await readFileContent(file);
      
      fileItems.push({
        name: file.name,
        path: file.webkitRelativePath || file.name,
        size: file.size,
        type: file.type,
        content
      });
    }

    setFiles(fileItems);
    toast({
      title: "Folder uploaded successfully!",
      description: `${fileItems.length} files processed`
    });
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.readAsText(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const items = e.dataTransfer.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i].webkitGetAsEntry();
        if (item?.isDirectory) {
          toast({
            title: "Folder detected!",
            description: "Please use the folder select button for full folder upload"
          });
        }
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUpload(files);
      toast({
        title: "Integration started!",
        description: "Your files are being integrated with the platform"
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Upload Your Project Folder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-2">Drop your folder here or click to select</p>
          <p className="text-sm text-gray-500 mb-4">
            Select an entire folder to upload all files at once
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="mb-2"
          >
            Select Folder
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          webkitdirectory=""
          multiple
          onChange={handleFolderSelect}
          className="hidden"
        />

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Uploaded Files ({files.length})</h3>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <span className="text-sm truncate">{file.path}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={handleUpload} className="w-full">
              Integrate with Platform
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};