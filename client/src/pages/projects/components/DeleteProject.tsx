import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import apiClient from "@/config/axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteProjectProps {
  projectId: string;
  getProjects: () => void;
}

const DeleteProject = ({ projectId, getProjects }: DeleteProjectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.delete(`/projects/${projectId}/delete`);
      toast.success(data.message, {
        onAutoClose: () => {
          setIsOpen(false);
          getProjects();
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting project");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="text-destructive hover:bg-white hover:text-destructive transition-all"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-5">
              <p>This action cannot be undone. This will permanently delete your project.</p>
              <div>
                <Button
                  variant={"destructive"}
                  onClick={handleDelete}
                  className="w-full"
                >
                  {isLoading && <Loading />}
                  <Trash />
                  Delete
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProject;
