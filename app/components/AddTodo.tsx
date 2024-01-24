"use client";

import { Box, Grid } from "@mui/material";
import CustomModal from "./UI/CustomModal";
import { useEffect, useState } from "react";
import CustomTextInput from "./UI/CustomTextInput";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import CustomButton from "./UI/CustomButton";
import { MdCheckCircleOutline } from "react-icons/md";
import { useCreateTodoMutation } from "@/redux/feature/todo/todoApi";
import { errorToast, successToast } from "./notifications/toaster";
import CustomDate from "./UI/CustomDate";

const AddTodo = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  // create new task
  const [createTodo, { data, isLoading, isError, isSuccess }] =
    useCreateTodoMutation();

  // handleClick fn
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createTodo({
      text: task,
      color: "",
      date: date,
      desc: desc,
      status: false,
    });
  };
  // error and success notification
  useEffect(() => {
    if (isSuccess) {
      successToast("Task created!");
      setOpen(false);
      setTask("");
    }
  }, [data]);
  useEffect(() => {
    isError && errorToast("Something went wrong!");
  }, [isError]);
  return (
    <Box>
      <CustomButton
        type="button"
        title="Add new Task"
        handleClick={() => setOpen(true)}
        icon={<HiOutlinePlusSmall />}
        loading={false}
      />
      <CustomModal title="Add New Task" open={open} setOpen={setOpen}>
        <Box>
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
                  title="save"
                  type="submit"
                  icon={<MdCheckCircleOutline />}
                  loading={isLoading}
                  color="success"
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default AddTodo;
