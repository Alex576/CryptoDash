export interface LoadingProps {
  text?: string;
}

export function Loading({ text }: LoadingProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white">
      <div className="text-center space-y-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="text-slate-400 text-sm">{text}</p>
      </div>
    </div>
  );
}
