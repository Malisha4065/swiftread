import type { FC } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FileUploadProps = {
  onUpload: () => void;
};

const FileUpload: FC<FileUploadProps> = ({ onUpload }) => {
  return (
    <Card className="w-full max-w-lg mx-4 text-center border-2 border-dashed shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">SwiftRead</CardTitle>
        <CardDescription>Upload a document to begin speed reading.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-6 p-8">
          <UploadCloud className="w-16 h-16 text-muted-foreground" />
          <p className="text-muted-foreground">This is a demo. Click below to load sample text.</p>
          <Button onClick={onUpload} size="lg">
            Load Sample Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
