import React, { useState } from 'react';
import { Card, Typography, TextField, Button, Chip, Select, MenuItem, FormControl, Stack } from '@mui/material';
import { Page } from '../components/layout/Page';

type Comment = {
  user: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
};

export const QA = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      user: 'John Doe',
      date: '2022-02-04T12:00:00',
      title: 'Do the lawyer-inc ??',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Legal', 'Review', 'Feedback'],
      likes: 14,
      comments: 14,
    },
    {
      user: 'Lexter',
      date: '2022-02-03T12:00:00',
      title: 'Do the lawyer-inc ??',
      content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      tags: ['Feedback', 'Client', 'Service'],
      likes: 14,
      comments: 14,
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [filter, setFilter] = useState('oldToNew');
  const [selectedTag, setSelectedTag] = useState<string | null>('All');

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          user: 'Anonymous',
          date: new Date().toISOString(),
          title: 'New Comment',
          content: newComment.trim(),
          tags: ['General'],
          likes: 0,
          comments: 0,
        },
      ]);
      setNewComment('');
    }
  };

  const filteredComments = [...comments]
    .filter((comment) =>
      selectedTag && selectedTag !== 'All' ? comment.tags.includes(selectedTag) : true
    )
    .sort((a, b) => {
      if (filter === 'newToOld') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  return (
    <Page sx={{ height: '100%', overflowY: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Q&A Comments
      </Typography>

      {/* 篩選區：日期排序 */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="oldToNew">Old to New</MenuItem>
          <MenuItem value="newToOld">New to Old</MenuItem>
        </Select>
      </FormControl>

      {/* 篩選區：Tag 按鈕 */}
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

      {/* 評論區 */}
      {filteredComments.map((comment, index) => (
        <Card key={index} sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
          <Typography variant="subtitle2" color="textSecondary">
            {comment.user} • {new Date(comment.date).toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {comment.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {comment.content}
          </Typography>
          <div style={{ marginTop: 10 }}>
            {comment.tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                color={selectedTag === tag ? 'primary' : 'default'}
                onClick={() => handleTagFilter(tag)}
                sx={{ marginRight: 1 }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <Typography variant="body2" color="textSecondary">
              💬 {comment.comments} Comments
            </Typography>
            <Typography variant="body2" color="textSecondary">
              👍 {comment.likes} Likes
            </Typography>
          </div>
        </Card>
      ))}

      {/* 新增評論區 */}
      <Card sx={{ width: '100%', padding: 2, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Submit
        </Button>
      </Card>
    </Page>
  );
};
