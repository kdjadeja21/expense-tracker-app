import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: async () => {
      toast.success("Category Deleted!");
      await queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (e) => {
      console.error("Error", e);
      toast.error("Failed to delete category");
    },
  });
  return mutation;
};
