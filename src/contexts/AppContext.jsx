import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducers/Reducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../constants/Api";

const Context = createContext();
const initialState = {
  user: {},
  courses: [],
  lessons: [],
  categories: [],
  enrollments: [],
  users: [],
  comments: [],
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  /* AUTHENTICATION */
  const registerUser = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const loginUser = async ({ email, password, role }) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const updateUser = async (details) => {
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("e-learning-user");
    navigate("../auth");
    toast.info("You have been logged out!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${api}/api/user/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_USERS", payload: data.users });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* COURSES */
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${api}/api/course/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_COURSES", payload: data.courses });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addCourse = async (details) => {
    try {
      const res = await fetch(`${api}/api/course/addCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({
          ...details,
          instructor: state?.user?.user?._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Course Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_COURSE", payload: data.course });
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const editCourse = async (details, id) => {
    try {
      const res = await fetch(`${api}/api/course/updateCourse/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Course Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "EDIT_COURSE",
          payload: { course: data.course, corId: id },
        });
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteCourse = async (id) => {
    try {
      const res = await fetch(`${api}/api/course/deleteCourse/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Course Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_COURSE", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* CATEGORIES */
  const fetchCats = async () => {
    try {
      const res = await fetch(`${api}/api/category/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "SET_CATS", payload: data.cats });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addCategory = async (name, setValue) => {
    try {
      const res = await fetch(`${api}/api/category/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({
          name,
          instructor: state?.user?.user?._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_CATEGORY", payload: data.cat });
        setValue("");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const editCategory = async (name, id, setValue, setEdit) => {
    try {
      const res = await fetch(`${api}/api/category/updateCategory/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category Updated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "EDIT_CATEGORY",
          payload: { name, catId: id },
        });
        setValue("");
        setEdit(false);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${api}/api/category/deleteCategory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_CATEGORY", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* LESSONS */
  const fetchLessons = async () => {
    try {
      const res = await fetch(`${api}/api/lesson/lessons`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_LESSONS", payload: data.lessons });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const addLesson = async (
    details,
    course,
    setOpen,
    setLessonDetails,
    initialState
  ) => {
    try {
      const res = await fetch(`${api}/api/lesson/addLesson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ ...details, course }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Lesson Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_LESSON", payload: data.lesson });
        setOpen(false);
        setLessonDetails(initialState);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const editLesson = async (details, id, setOpen) => {
    try {
      const res = await fetch(`${api}/api/lesson/updateLesson/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify(details),
      });

      const data = await res.json();
      if (data.success) {
        setOpen(false);
        toast.success("Lesson Edited", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({
          type: "EDIT_LESSON",
          payload: { lesson: details, lid: id },
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteLesson = async (id) => {
    try {
      const res = await fetch(`${api}/api/lesson/deleteLesson/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Lesson Added", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_LESSON", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* ENROLLMENTS */
  const fetchEnrollments = async () => {
    try {
      const res = await fetch(`${api}/api/enroll/enrollments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_ENROLLMENTS", payload: data.enrollments });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const enrollStudent = async (course) => {
    try {
      const res = await fetch(`${api}/api/enroll/enrollStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ course }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Successfully Enrolled 👍", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ENROLL_STUDENT", payload: data.enroll });
        navigate("../enrolledCourses");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const giveRating = async (rating, id) => {
    try {
      const res = await fetch(`${api}/api/course/updateRating/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ rating }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Thank you for your feedback! Explore more courses", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "UPDATE_RATING", payload: { rating, id } });
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  /* COMMENTS */
  const fetchComments = async () => {
    try {
      const res = await fetch(`${api}/api/comment/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "SET_COMMENTS", payload: data.comments });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const postComment = async (comment, lesson, setOpen, setComment) => {
    try {
      const res = await fetch(`${api}/api/comment/postComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
        body: JSON.stringify({ comment, lesson }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Posted 👍", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpen(false);
        setComment("");
        dispatch({ type: "POST_COMMENT", payload: data.comment });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const deleteComment = async (id) => {
    try {
      const res = await fetch(`${api}/api/comment/deleteComment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.user?.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Deleted", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "DELETE_COMMENT", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("e-learning-user"));
    if (loggedInUser) dispatch({ type: "SET_USER", payload: loggedInUser });
  }, [navigate]);

  useEffect(() => {
    if (state?.user && Object.keys(state?.user).length > 0) {
      fetchCourses();
      fetchCats();
      fetchLessons();
      fetchEnrollments();
      fetchUsers();
      fetchComments();
    }
  }, [state?.user]);

  return (
    <Context.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        dispatch,
        handleLogout,
        updateUser,
        addCourse,
        editCourse,
        deleteCourse,
        addCategory,
        editCategory,
        deleteCategory,
        addLesson,
        editLesson,
        deleteLesson,
        enrollStudent,
        giveRating,
        postComment,
        deleteComment,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { useGlobalContext, AppContext };
