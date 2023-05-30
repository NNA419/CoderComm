import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { POST_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    error: null,
    postsById: {

    },
    currentPagePosts: [],
}

const slice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPagePosts.length % POST_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count, posts } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
    sendPostReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
    resetPosts(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },
    deletePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    updatePostSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    }
  },
});

export const createPost = ({ content, image }) => async(dispatch) => {
    dispatch(slice.actions.startLoading());
  try {
      //upload image to cloudinary
    const imageUrl = await cloudinaryUpload(image);
        const response = await apiService.post("/posts", {
          content,
          image : imageUrl,
        });
        dispatch(slice.actions.createPostSuccess(response.data));
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
}

export const UpdatePost = ({ content, image , userId , postId}) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      console.log(imageUrl)
      let param = {content};
      if (imageUrl) {
        param.image = imageUrl;
      }
      const response = await apiService.put(`/posts/${postId}`, param);
      dispatch(slice.actions.updatePostSuccess(response.data));
      dispatch(getPosts({userId , page: 1}))
      toast.success("Update success")
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };


export const getPosts =
  ({ userId, page, limit = POST_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userId}`, {
        params,
      });
      if(page === 1) dispatch(slice.actions.resetPosts())
      dispatch(slice.actions.getPostSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
     
export const sendPostReaction = ({ postId, emoji }) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
        const response = await apiService.post(`/reactions`, {
          targetType: "Post",
          targetId: postId,
          emoji,
        });
        dispatch(
            slice.actions.sendPostReactionSuccess({
                postId,
                reactions: response.data,
            })
        );
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
}
  // ------------------------------

export const deletePost = ({postId , userId}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
 
  try {
    console.log(postId);
    const response = await apiService.delete(`/posts/${postId}`)
    dispatch(slice.actions.deletePostSuccess(response.data));
    dispatch(getPosts({userId , page : 1}));
    toast.success("Post Deleted")
    console.log(userId)
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
}

export const getSinglePost = ({ postId }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());

  try {
    
  } catch (error) {
    
  }
}

export default slice.reducer;