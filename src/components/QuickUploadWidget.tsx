import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FolderOpen, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickUploadWidget: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Upload className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Project Integration</h3>
            </div>
            <p className="text-sm text-gray-600">
              Upload your project folder to integrate with our platform
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/upload">
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                <FolderOpen className="h-4 w-4 mr-2" />
                Upload Project
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            <span>Seamless Integration</span>
          </div>
          <div className="flex items-center gap-1">
            <Upload className="h-3 w-3" />
            <span>Drag & Drop Support</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};