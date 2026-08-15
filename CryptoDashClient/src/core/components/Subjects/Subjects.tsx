import { useGetAllSubjectsQuery } from "@/core/features/subject/subjectApiSlice";
import { Loading } from "../Loading/Loading";
import { SmartGrid } from "../SmartGrid";

export interface SubjectsProps {
  prop?: string;
}

export function Subjects({ prop = "default value" }: SubjectsProps) {
  const {
    data: subjects,
    isLoading,
    error,
    isError,
  } = useGetAllSubjectsQuery();
  console.log(error, isError, isLoading);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <div className="h-full w-full">
      <SmartGrid grid={subjects?.grid} />
    </div>
  );
}
