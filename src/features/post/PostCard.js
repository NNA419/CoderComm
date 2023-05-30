import React, { useCallback, useState } from 'react';
import {
    Box,
    Link,
    Card,
    Stack,
    Avatar,
    Typography,
    CardHeader,
    IconButton,
    Menu,
    Divider,
    MenuItem,
    Modal,
    alpha,
    Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import PostReaction from './PostReaction';
import CommentList from '../comment/CommentList';
import ComentForm from '../comment/ComentForm';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePost, deletePost } from './postSlice';
import { FTextField, FUploadImage, FormProvider } from '../../components/form';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

const defaultValues = {
  content: "",
  image: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PostCard({ post }) {
  const [open, setOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const dispatch = useDispatch();

  console.log(post)

  const handleClose = () => setOpen(false);
  
  const methods = useForm({
    // resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const { isLoading } = useSelector((state) => state.post);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(UpdatePost({ ...data, postId: post._id, userId: post.author._id }));
    reset();
    setOpen(false);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleModalDeletePost = () => {
    setOpenQuestion(true);
  };

  const handleDeletePost = () => {
    dispatch(deletePost({postId : post._id , userId : post.author._id }));
    handleMenuclose();
  }

  const handleEditPost = () => {
    setOpen(true);
    setValue("content", post.content)
  }

 

  const handlePostMenuOpen = (e) => {
    setAnchorEl(e.currentTarget)
  };
  
  const handleMenuclose = () => {
    setAnchorEl(null);
  };

  const handleQuestionClose = () => {
    setOpenQuestion(false)
  };
  
  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuclose}
    >

      <MenuItem
        onClick={handleEditPost}
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Edit Post
      </MenuItem>

      <MenuItem
        onClick={handleModalDeletePost}
        sx={{ mx: 1 }}
      >
        Delete Post
      </MenuItem>

    </Menu>
  );

console.log("PostCard")

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ p: 3 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FTextField
                  name="content"
                  content={post.content}
                  multiline
                  fullWidth
                  rows={4}
                  placeholder="Edit your content"
                  sx={{
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: alpha("#919EAB", 0.32),
                    },
                  }}
                />
                {/* <FTextField name="image" placeholder="Image" /> */}

                {/* <input type='file' ref={fileInput} onChange={handleFile}/> */}

                <FUploadImage
                  image={post.image}
                  name="image"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />

                <Box
                  sx={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting || isLoading}
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </Stack>
            </FormProvider>
          </Card>
        </Box>
      </Modal>

      <Modal
        open={openQuestion}
        onClose={handleQuestionClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{padding: 3 , display: "flex", flexDirection: "row" , justifyContent:"space-around"}}>
            <Button variant="contained" color="error" onClick={() => setOpenQuestion(false)} >No</Button>
            <Button variant="contained" color="success" onClick={handleDeletePost}>Yes</Button>
          </Card>
        </Box>
      </Modal>

      <Card>
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="text.primary"
              component={RouterLink}
              sx={{ fontweight: 600 }}
              to={`/user/${post.author._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post.createdAt)}
            </Typography>
          }
          action={
            <IconButton onClick={handlePostMenuOpen}>
              <MoreVertIcon sx={{ fontsize: 30 }} />
            </IconButton>
          }
        />
        {renderMenu}
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{post.content}</Typography>

          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={post.image}
                alt="post"
              />
            </Box>
          )}

          <PostReaction post={post} />
          <CommentList postId={post._id} />
          <ComentForm postId={post._id} />
        </Stack>
      </Card>
    </div>
  );
}

export default PostCard