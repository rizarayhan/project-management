import Header from "@/components/header";
import FormProject from "./components/FormProject";

const ProjectPage = () => {
  return (
    <div>
      <Header title="My Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center justify-center bg-white border-2 border-dashed rounded-lg shadow-sm hover:shadow-lg transition-all p-5 space-y-5">
          <FormProject />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
