const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_USERS":
      return { ...state, users: [...action.payload] };

    case "SET_COURSES":
      return { ...state, courses: [...action.payload] };

    case "ADD_COURSE":
      return { ...state, courses: [...state.courses, action.payload] };

    case "EDIT_COURSE":
      const { course, corId } = action.payload;
      const tempCourses = state.courses.map((item) => {
        if (item._id === corId) return { ...course };
        return item;
      });

      return {
        ...state,
        courses: tempCourses,
      };

    case "UPDATE_RATING":
      const { rating, id } = action.payload;
      const tempCoursesRating = state.courses.map((item) => {
        if (item._id === id) return { ...item, rating };
        return item;
      });

      return {
        ...state,
        courses: tempCoursesRating,
      };

    case "DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((item) => item._id !== action.payload),
      };

    case "SET_LESSONS":
      return { ...state, lessons: [...action.payload] };

    case "ADD_LESSON":
      return { ...state, lessons: [...state.lessons, action.payload] };

    case "EDIT_LESSON":
      const { lesson, lid } = action.payload;
      const tempLessons = state.lessons.map((item) => {
        if (item._id === lid) {
          item.title = lesson.title;
          item.desscription = lesson.description;
        }
        return item;
      });

      return {
        ...state,
        lessons: tempLessons,
      };

    case "DELETE_LESSON":
      return {
        ...state,
        lessons: state.lessons.filter((item) => item._id !== action.payload),
      };

    case "SET_CATS":
      return { ...state, categories: [...action.payload] };

    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };

    case "EDIT_CATEGORY":
      const { name, catId } = action.payload;
      const tempCats = state.categories.map((item) => {
        if (item._id === catId) item.name = name;
        return item;
      });

      return {
        ...state,
        categories: tempCats,
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "SET_ENROLLMENTS":
      return { ...state, enrollments: [...action.payload] };

    case "ENROLL_STUDENT":
      return { ...state, enrollments: [...state.enrollments, action.payload] };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_COMMENTS":
      return { ...state, comments: [...action.payload] };

    case "POST_COMMENT":
      return { ...state, comments: [...state.comments, action.payload] };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default AppReducer;
