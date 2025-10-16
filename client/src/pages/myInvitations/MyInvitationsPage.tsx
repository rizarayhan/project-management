import Header from "@/components/header";
import LoadingPage from "@/components/LoadingPage";
import MetaItem from "@/components/MetaItem";
import apiClient from "@/config/axios";
import delay from "@/lib/delay";
import type { Invitations } from "@/types/type";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Text, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReadMore from "./components/ReadMore";
import { Button } from "@/components/ui/button";
import NoDataPage from "@/components/NoDataPage";

const MyInvitationsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Invitations[]>([]);

  const getInvitations = async () => {
    setIsLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.get("invitation/my-invitations");
      setInvitations(data.invitations);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error("Error getting invitations", {
        onAutoClose: () => {
          setIsLoading(false);
        },
      });
    }
  };

  useEffect(() => {
    getInvitations();
  }, []);

  if (isLoading) return <LoadingPage />;
  if (invitations.length === 0) return <NoDataPage text="No Invitations Found" />;

  const trimText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const handleAction = async (id: string, status: string) => {
    setIsConfirm(true);
    try {
      await delay(500);
      const { data } = await apiClient.post("/invitation/confirm", {
        invitationId: id,
        status: status,
      });
      toast.success(data.message, {
        onAutoClose: () => {
          getInvitations();
          setIsConfirm(false);
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.message, {
        onAutoClose: () => setIsConfirm(false),
      });
    }
  };

  return (
    <div>
      <Header title="My Invitations" />
      <div className="grid grid-cols-3">
        {invitations.map((invitation, index) => (
          <div
            key={index}
            className="border rounded-md p-3 space-y-1 border-l-2 border-l-teal-600"
          >
            <h4 className="font-semibold">.{invitation.project.title}</h4>
            <MetaItem
              label="Sender"
              content={invitation.sender.name}
              icon={<User size={16} />}
            />
            <MetaItem
              label="Due Date"
              icon={<Calendar size={16} />}
              content={format(new Date(invitation.project.dueDate), "EEEE, dd MMM yyyy", { locale: id })}
            />
            <MetaItem
              label="Description"
              icon={<Text size={16} />}
              isBlock
              isBold
              content={trimText(invitation.project.description, 100)}
            />
            <div className="flex justify-end mb-3">{invitation.project.description.length > 100 && <ReadMore description={invitation.project.description} />}</div>
            <div className="flex justify-between gap-x-2">
              <Button
                size={"sm"}
                className="w-3/5"
                onClick={() => handleAction(invitation._id, "accepted")}
                disabled={isConfirm}
              >
                Accept
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                className="w-2/5"
                onClick={() => handleAction(invitation._id, "declined")}
                disabled={isConfirm}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInvitationsPage;
