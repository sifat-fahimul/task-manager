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
import CustomDate from "./UI/CustomDate";

interface IState extends ITasks {
  key?: string | number;
}

const TodoList: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
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
    setDate(row.date);
    setDesc(row.desc);
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
    editTask({
      id: row?.id,
      data: { ...row, text: task, desc: desc, date: date },
    });
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
      field: "texst",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      minWidth: 70,
      maxWidth: 70,
      flex: 1,
      renderCell: (row) => {
        const { status, id } = row.row;
        return (
          <>
            <div
              className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                status && "border-green-500 focus-within:border-green-500"
              }`}
            >
              <input
                type="checkbox"
                checked={status}
                onClick={() =>
                  editTask({
                    id: id,
                    data: { ...row.row, status: !status },
                  })
                }
                // onChange={() => handleStatusChange(_id)}
                className="opacity-0 absolute rounded-full cursor-pointer"
              />
              {status && (
                <svg
                  className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              )}
            </div>
          </>
        );
      },
    },
    {
      field: "text",
      headerName: "Title",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "desc",
      headerName: "Task Description",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "color",
      headerName: "Priority",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flex: 1,
      renderCell: (row) => {
        const { color: priority, id } = row.row;
        return (
          <>
            <div
              className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                priority === "green" && "bg-green-500"
              }`}
              onClick={() =>
                editTask({
                  id: id,
                  data: { ...row.row, color: "green" },
                })
              }
            ></div>

            <div
              className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                priority === "yellow" && "bg-yellow-500"
              }`}
              onClick={() =>
                editTask({
                  id: id,
                  data: { ...row.row, color: "yellow" },
                })
              }
            ></div>

            <div
              className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                priority === "red" && "bg-red-500"
              }`}
              onClick={() =>
                editTask({
                  id: id,
                  data: { ...row.row, color: "red" },
                })
              }
            ></div>
          </>
        );
      },
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
            <Grid item xs={12} sm={6} md={6}>
              <CustomTextInput
                label="Task Name"
                setValue={setTask}
                value={task}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CustomDate
                label="Date"
                setValue={setDate}
                value={date}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                label="Description"
                setValue={setDesc}
                value={desc}
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
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
