import Header from "@/components/header";
import { Link, useParams } from "react-router";
import DetailProject from "./components/DetailProject";
import delay from "@/lib/delay";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { Collaborator, Project } from "@/types/type";
import LoadingPage from "@/components/LoadingPage";
import ListCollaborators from "./components/ListCollaborators";

const ManageJobsPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  const getProject = async () => {
    try {
      await delay(500);
      const { data } = await apiClient.get(`/projects/${projectId}`);
      setProject(data.project);
      setCollaborators(data.project.collaborators);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.response.error.message);
    }
  };

  const getJobs = async () => {
    try {
      await delay(500);
      const { data } = await apiClient.get(`/jobs/${projectId}/get-jobs`);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error getting projects");
    }
  };

  useEffect(() => {
    getProject();
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <div>
      <Header
        title="Manage Jobs"
        children={
          <Link
            to={"/projects"}
            className="text-sm"
          >
            Back
          </Link>
        }
      />
      <div>
        <DetailProject project={project} />
        <div className="grid grid-cols-12">
          <ListCollaborators
            collaborators={collaborators}
            getProject={getProject}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageJobsPage;
