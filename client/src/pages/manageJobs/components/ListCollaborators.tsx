import { Button } from "@/components/ui/button";
import apiClient from "@/config/axios";
import type { Collaborator } from "@/types/type";
import { Trash, Users } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import SendInvitation from "./SendInvitation";
import InvitationBox from "./InvitationBox";

interface ListCollaboratorsProps {
  collaborators: Collaborator[];
  getProject: () => void;
}

const ListCollaborators = ({ collaborators, getProject }: ListCollaboratorsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { projectId } = useParams();

  const handleDelete = async (email: string) => {
    setIsLoading(true);
    try {
      const { data } = await apiClient.delete(`/projects/${projectId}/delete-collaborator`, {
        data: {
          email,
        },
      });
      toast.success(data.message, {
        onAutoClose: () => {
          setIsLoading(false);
          getProject();
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message, {
        onAutoClose: () => setIsLoading(false),
      });
    }
  };

  return (
    <div className="border p-5 col-span-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-1 items-center">
          <Users size={16} />
          <span>Collaborators</span>
        </div>
        <div className="space-x-1">
          <InvitationBox />
          <SendInvitation />
        </div>
      </div>
      <div className="space-y-3 pt-3">
        {collaborators.map((collaborator, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="capitalize">{collaborator.name}</p>
              <p>{collaborator.email}</p>
            </div>
            <div>
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => handleDelete(collaborator.email)}
                disabled={isLoading}
              >
                <Trash className="text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCollaborators;
