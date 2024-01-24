import { ITasks } from "@/types/tasks";
import { apiSlice } from "../../apiSlice";

const todoApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "/tasks",
    }),
    createTodo: builder.mutation({
      query: (data: ITasks) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const task = await queryFulfilled;
          // pessimistic update
          dispatch(
            todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
              if (Array.isArray(draft)) {
                draft.push(task.data);
              }
            })
          );
        } catch (error) {
          // Handle error
        }
      },
    }),

    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const tasks = await queryFulfilled;
          // pessimistic update
          dispatch(
            todoApi.util.updateQueryData("getAllTodos", undefined, (draft) => {
              const draftTask = draft.find((task: ITasks) => task.id == arg.id);
              draftTask.text = tasks.data.text;
            })
          );
        } catch (error) {}
      },
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            undefined,
            (draft: ITasks[]) => {
              return (draft = draft.filter((task) => task.id !== arg));
            }
          )
        );

        try {
          const res = await queryFulfilled;
          if (res) {
            //patchResult.undo();
          }
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useEditTaskMutation,
} = todoApi;
