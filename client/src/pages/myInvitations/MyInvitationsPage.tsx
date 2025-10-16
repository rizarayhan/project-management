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

const MyInvitationsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<Invitations[]>([]);

  const getInvitations = async () => {
    setIsLoading(true);
    try {
      await delay(500);
      const { data } = await apiClient.get("invitation/my-invitations");
      console.log(data);

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

  const trimText = (text: string, limit: number) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
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
              content={
                <>
                  <p>{format(new Date(invitation.project.dueDate), "EEEE, dd MMM yyyy", { locale: id })}</p>
                </>
              }
            />
            <MetaItem
              label="Description"
              icon={<Text size={16} />}
              isBlock
              isBold
              content={
                <>
                  <p>{trimText(invitation.project.description, 100)}</p>
                </>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInvitationsPage;
