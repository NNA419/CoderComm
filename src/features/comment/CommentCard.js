import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from 'react-redux';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteComment } from './commentSlice';

function CommentCard({ comment }) {
    console.log(comment)
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    

    const handleDeleteComment = () => {
        dispatch(deleteComment({ postId: comment.post, commentId: comment._id }));
        handleMenuclose();
 };


      const handlePostMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
      };

      const handleMenuclose = () => {
        setAnchorEl(null);
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
        <MenuItem onClick={handleDeleteComment} sx={{ mx: 1 }}>
          Delete Comment
        </MenuItem>
      </Menu>
    );

    return (
      <Stack direction="row" spacing={2}>
        <Avatar alt={comment.author?.name} src={comment.author?.avatarUlr} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {comment.author?.name}
            </Typography>
            <Typography varianr="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
                    
            <IconButton onClick={handlePostMenuOpen}>
              <MoreVertIcon sx={{ fontsize: 30 }} />
            </IconButton>
                    {renderMenu}
          </Stack>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CommentReaction comment={comment} />
          </Box>
        </Paper>
      </Stack>
    );
}

export default CommentCard