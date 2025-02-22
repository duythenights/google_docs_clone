import Editor from "./Editor";

interface DocuemntDetailProps {
  params: Promise<{ documentId: string }>;
}
export default async function DocuemntDetail({ params }: DocuemntDetailProps) {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
}
