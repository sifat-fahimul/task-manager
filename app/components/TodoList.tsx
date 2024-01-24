"use client";

import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import CustomTable from "./UI/table/CustomTable";
import {
  useDeleteTodoMutation,
  useEditTaskMutation,
  useGetAllTodosQuery,
} from "../../redux/feature/todo/todoApi";
import { Box, Grid } from "@mui/material";
import CustomButton from "./UI/CustomButton";
import { BiEdit } from "react-icons/bi";
import { MdCheckCircleOutline, MdOutlineDelete } from "react-icons/md";
import { errorToast, successToast } from "./notifications/toaster";
import { ITasks } from "@/types/tasks";
import CustomModal from "./UI/CustomModal";
import CustomTextInput from "./UI/CustomTextInput";

interface IState {
  id?: string;
  text: string;
  key?: string | number;
}

const TodoList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [row, setRow] = useState<IState>();
  // get tasks list
  const { data, error, isLoading } = useGetAllTodosQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const tasks = Array.isArray(data)
    ? data.map((e: any, i: number) => ({ ...e, key: i + 1 }))
    : [];

  // handle edit fn
  const handleEdit = (row: ITasks) => {
    setTask(row.text);
    setRow(row);
    setOpen(true);
  };

  // delete todo mutation
  const [
    deleteTodo,
    { data: deleteData, isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteTodoMutation();
  // edit todo mutation
  const [
    editTask,
    {
      data: editData,
      isSuccess: editSuccess,
      error: editError,
      isLoading: editLoading,
    },
  ] = useEditTaskMutation();

  // handleClick fn
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    editTask({ id: row?.id, data: { ...row, text: task } });
  };

  // error and success notification
  useEffect(() => {
    if (deleteSuccess) {
      successToast("Task deleted!");
    }
  }, [deleteData]);
  useEffect(() => {
    deleteError && errorToast("Something went wrong!");
  }, [deleteError]);
  // edit notification
  useEffect(() => {
    if (editSuccess) {
      successToast("Update Successful!");
      setOpen(false);
    }
  }, [editData]);
  useEffect(() => {
    editError && errorToast("Something went wrong!");
  }, [editError]);
  //
  useEffect(() => {
    error && errorToast("Something went wrong!");
  }, [error]);

  //  table columns
  const columns: GridColDef[] = [
    {
      field: "text",
      headerName: "Task Description",
      align: "center",
      headerAlign: "center",
      width: 150,
      flex: 1,
    },
    {
      field: "id",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      renderCell: (row) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
            <div className="mx-2">
              <CustomButton
                type="button"
                handleClick={() => handleEdit(row.row)}
                icon={<BiEdit className="-ml-2" />}
                color="primary"
              />
            </div>
            <CustomButton
              type="button"
              handleClick={() => deleteTodo(row.row.id)}
              icon={<MdOutlineDelete className="-ml-2" />}
              color="error"
            />
          </Box>
        );
      },
      minWidth: 200,
      maxWidth: 200,
      flex: 1,
    },
  ];
  return (
    <div className="h-5/6 w-100">
      <CustomTable columns={columns} rows={tasks ?? []} loading={isLoading} />
      <CustomModal title="Add New Task" open={open} setOpen={setOpen}>
        <form onSubmit={handleClick}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={8}>
              <CustomTextInput
                label="Task Name"
                setValue={setTask}
                value={task}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomButton
                title="Update"
                type="submit"
                icon={<MdCheckCircleOutline />}
                loading={editLoading}
                color="success"
              />
            </Grid>
          </Grid>
        </form>
      </CustomModal>
    </div>
  );
};

export default TodoList;
