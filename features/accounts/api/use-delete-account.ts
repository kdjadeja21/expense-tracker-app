import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$delete"]
>;

export const useDeleteAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: async () => {
      toast.success("Account Deleted!");
      await queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      await queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (e) => {
      console.error("Error", e);
      toast.error("Failed to delete account");
    },
  });
  return mutation;
};
