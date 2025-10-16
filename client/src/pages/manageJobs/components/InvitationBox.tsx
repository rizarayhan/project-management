import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import apiClient from "@/config/axios";
import delay from "@/lib/delay";
import type { Invitations } from "@/types/type";
import { MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const InvitationBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { projectId } = useParams();
  const [invitations, setInvitations] = useState<Invitations[]>([]);

  const getInvitation = async () => {
    setIsLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.get(`invitation/${projectId}/get-sent-invitation`);
      setInvitations(data.invitation);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  const cancelInvitation = async (id: string) => {
    try {
      await delay(500);
      const { data } = await apiClient.delete(`/invitation/${id}/cancel-invitation`);
      toast.success(data.message, {
        onAutoClose: () => getInvitation(),
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen && getInvitation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
        >
          <MailCheck size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sent Invitation</DialogTitle>
          <DialogDescription asChild>
            <div>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  {invitations.length > 0 ? (
                    invitations.map((invitation, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between border-b py-2"
                      >
                        <div className="flex justify-between">
                          <div>
                            <p className="capitalize">{invitation.receiver.name}</p>
                            <p>{invitation.receiver.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p>{format(new Date(invitation.createdAt), "EEEE, dd MMM yyyy", { locale: id })}</p>
                            <div className="space-x-1">
                              <Badge className="capitalize">{invitation.status}</Badge>
                              <Badge
                                variant={"destructive"}
                                onClick={() => cancelInvitation(invitation._id)}
                                className="cursor-pointer capitalize"
                              >
                                Cancel
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>No Active Invitations</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationBox;
