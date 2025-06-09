import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";

interface ProfilePictureUploadProps {
  currentImage?: string | null;
  username: string;
  onImageChange: (imageData: string) => void;
}

export function ProfilePictureUpload({ currentImage, username, onImageChange }: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getUserInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={preview || undefined} alt={`${username}'s profile`} />
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white">
            {getUserInitials(username)}
          </AvatarFallback>
        </Avatar>
        
        {preview && (
          <Button
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-2">
          <Camera className="h-8 w-8 text-gray-400 mx-auto" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">
              Drop your photo here, or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports: JPG, PNG, GIF (max 5MB)
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
          className="rounded-lg"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Photo
        </Button>
        
        {preview && (
          <Button
            onClick={removeImage}
            variant="ghost"
            size="sm"
            className="rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Remove Photo
          </Button>
        )}
      </div>
    </div>
  );
}