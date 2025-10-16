import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/type";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DetailProjectProps {
  project: Project | null;
}

const DetailProject = ({ project }: DetailProjectProps) => {
  return (
    <div className="space-y-3 border rounded-md p-5">
      <p className="font-semibold text-lg">Job Title: {project?.title}</p>
      <p>{project?.description}</p>
      <p>Due Date: {project && format(new Date(project.dueDate), "EEEE, dd MMM yyyy", { locale: id })}</p>
      <div className="flex gap-x-1 items-center">
        {project &&
          project.tags.map((tag, index) => (
            <Badge
              key={index}
              variant={"secondary"}
              className="capitalize"
            >
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  );
};

export default DetailProject;
