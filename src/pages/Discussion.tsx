import React, { useState } from 'react';
import {
  Card,
  Typography,
  TextField,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Page } from '../components/layout/Page';

// Define the Comment type
type Comment = {
  user: string;
  date: string;
  content: string;
};

type Post = {
  user: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
};

export const Discussion = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      user: 'John Doe',
      date: '2022-02-04T12:00:00',
      title: 'Do the lawyer-inc ??',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Legal', 'Review', 'Feedback'],
      likes: 14,
      comments: [
        { user: 'Anonymous', date: '2022-02-05T12:00:00', content: 'Great post!' },
      ],
    },
  ]);

  const [filter, setFilter] = useState('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [popupComment, setPopupComment] = useState('');
  const [newPost, setNewPost] = useState('');

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const handleOpenDialog = (post: Post) => {
    setCurrentPost(post);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setPopupComment('');
  };

  const handleAddPopupComment = () => {
    if (popupComment.trim() && currentPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post === currentPost
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { user: 'Anonymous', date: new Date().toISOString(), content: popupComment },
                ],
              }
            : post
        )
      );
      handleCloseDialog();
    }
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          user: 'Anonymous',
          date: new Date().toISOString(),
          title: 'New Post',
          content: newPost,
          tags: ['General'],
          likes: 0,
          comments: [],
        },
        ...posts,
      ]);
      setNewPost('');
    }
  };

  const filteredPosts = [...posts]
    .filter((post) =>
      selectedTag && selectedTag !== 'All' ? post.tags.includes(selectedTag) : true
    )
    .sort((a, b) => {
      switch (filter) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'mostRelevant':
          return b.likes - a.likes;
        case 'mostActive':
          return b.comments.length - a.comments.length;
        default:
          throw new Error(`Unknown filter type: ${filter}`);
      }
    });

  return (
    <Page sx={{ height: '100%', overflowY: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Discussion
      </Typography>
      {/* Dropdown to select sorting option */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="mostRelevant">Most Relevant</MenuItem>
          <MenuItem value="mostActive">Most Active</MenuItem>
        </Select>
      </FormControl>
      {/* Tag filtering buttons */}
      <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
        <Chip
          label="All"
          color={selectedTag === 'All' ? 'primary' : 'default'}
          onClick={() => handleTagFilter('All')}
        />
        {['Legal', 'Review', 'Feedback', 'Client', 'Service'].map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            color={selectedTag === tag ? 'primary' : 'default'}
            onClick={() => handleTagFilter(tag)}
          />
        ))}
      </Stack>
      {/* Render the list of filtered and sorted posts */}
      {filteredPosts.map((post, index) => (
        <Card key={index} sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            {post.user} • {new Date(post.date).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {post.content.length > 100
              ? `${post.content.slice(0, 100)}...`
              : post.content}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <IconButton onClick={() => handleOpenDialog(post)}>
              💬 {post.comments.length} Comments
            </IconButton>
            <IconButton>👍 {post.likes} Likes</IconButton>
          </div>
        </Card>
      ))}
      {/* Popup Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>{currentPost?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {currentPost?.user} • {currentPost && new Date(currentPost.date).toLocaleString()}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {currentPost?.content}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Comments
          </Typography>
          {currentPost?.comments.map((comment, index) => (
            <Card key={index} sx={{ padding: 2, marginBottom: 1 }}>
              <Typography variant="subtitle2">{comment.user}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(comment.date).toLocaleString()}
              </Typography>
              <Typography variant="body1">{comment.content}</Typography>
            </Card>
          ))}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Add a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your comment here..."
            value={popupComment}
            onChange={(e) => setPopupComment(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddPopupComment}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Single Post Section at the bottom */}
      <Card sx={{ width: '100%', padding: 2, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Post
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Write your post here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleAddPost}>
          Submit
        </Button>
      </Card>
    </Page>
  );
};

export default Discussion;
