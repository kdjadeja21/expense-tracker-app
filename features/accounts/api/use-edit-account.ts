import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)[":id"]["$patch"]
>["json"];

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: async () => {
      toast.success("Account Updated!");
      await queryClient.invalidateQueries({ queryKey: ["account", { id }] });
      await queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (e) => {
      console.error("Error", e);
      toast.error("Failed to edit account");
    },
  });
  return mutation;
};
