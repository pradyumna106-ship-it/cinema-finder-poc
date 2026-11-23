import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Chip,
  Rating,
  Divider,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Alert,
} from '@mui/material';
import {
  MdArrowBack,
  MdLocationOn,
  MdPhone,
  MdAccessTime,
  MdMovie,
  MdRateReview,
  MdNearMe,
  MdSend,
} from 'react-icons/md';
import { useCinemaContext } from '../../context/CinemaContext';

const CinemaDetailView = ({ cinema, onBack }) => {
  const { openBooking, getCinemaDistance } = useCinemaContext();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // User review state
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [reviewsList, setReviewsList] = useState(cinema?.reviews || []);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!cinema) return null;

  const distance = getCinemaDistance(cinema);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newRev = {
      name: newReviewName.trim() || 'Film Enthusiast',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewText.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewText('');
    setNewReviewName('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 112px)', overflowY: 'auto', p: 2, color: '#f8fafc' }}>
      {/* Header with Back Button */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconButton
          onClick={onBack}
          sx={{
            color: '#f59e0b',
            bgcolor: '#1e293b',
            border: '1px solid #334155',
            '&:hover': { bgcolor: '#334155' },
          }}
          title="Back to Cinemas List"
        >
          <MdArrowBack />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            {cinema.name}
          </Typography>
          {cinema.franchise && cinema.franchise !== 'unknown' && (
            <Chip
              label={cinema.franchise.toUpperCase()}
              size="small"
              sx={{
                mt: 0.5,
                bgcolor: '#f59e0b',
                color: '#000',
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 20,
              }}
            />
          )}
        </Box>
      </Stack>

      {/* Ratings and Distance */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Rating value={cinema.rating || 4.5} precision={0.1} size="small" readOnly />
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#fbbf24' }}>
            {cinema.rating}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            ({cinema.reviewCount || 100}+ reviews)
          </Typography>
        </Stack>

        {distance !== null && (
          <Chip
            icon={<MdNearMe style={{ color: '#38bdf8' }} />}
            label={`${distance.toFixed(1)} km away`}
            size="small"
            sx={{
              bgcolor: 'rgba(56, 189, 248, 0.1)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              fontSize: '0.72rem',
            }}
          />
        )}
      </Stack>

      {/* Address & Phone */}
      <Box sx={{ mb: 2, bgcolor: '#1e293b', p: 1.5, borderRadius: 2, border: '1px solid #334155' }}>
        {cinema.address && (
          <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 1 }}>
            <MdLocationOn style={{ color: '#e50914', fontSize: 18, marginTop: 2, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: '#cbd5e1', whiteSpace: 'pre-line' }}>
              {cinema.address}
            </Typography>
          </Stack>
        )}
        {cinema.phoneNumber && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <MdPhone style={{ color: '#38bdf8', fontSize: 16, flexShrink: 0 }} />
            <Typography
              component="a"
              href={`tel:${cinema.phoneNumber}`}
              variant="body2"
              sx={{ color: '#38bdf8', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {cinema.phoneNumber}
            </Typography>
          </Stack>
        )}
      </Box>

      {/* Image Gallery */}
      {cinema.photos && cinema.photos.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box
            component="img"
            src={cinema.photos[activePhotoIdx] || cinema.photos[0]}
            alt="Cinema auditorium"
            sx={{
              width: '100%',
              height: 180,
              objectFit: 'cover',
              borderRadius: 2,
              border: '1px solid #334155',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            {cinema.photos.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`Cinema thumbnail ${idx + 1}`}
                onClick={() => setActivePhotoIdx(idx)}
                sx={{
                  width: 54,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: activePhotoIdx === idx ? '#f59e0b' : '#334155',
                  opacity: activePhotoIdx === idx ? 1 : 0.6,
                  transition: 'all 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Products & Amenities */}
      {cinema.products && cinema.products.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b', mb: 1 }}>
            PRODUCTS & AMENITIES
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {cinema.products.map((prod) => (
              <Chip
                key={prod}
                label={prod}
                size="small"
                sx={{
                  bgcolor: '#1e293b',
                  color: '#e2e8f0',
                  border: '1px solid #334155',
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: '#334155', my: 2 }} />

      {/* Film Showings (Now Playing) */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <MdMovie style={{ color: '#e50914', fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff' }}>
            Film Showings Today
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {(cinema.movies || []).map((movie) => (
            <Card
              key={movie.id}
              sx={{
                display: 'flex',
                bgcolor: '#131b2e',
                border: '1px solid #1e293b',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#f59e0b', transform: 'translateY(-2px)' },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 90, objectFit: 'cover' }}
                image={movie.poster}
                alt={movie.title}
              />
              <CardContent sx={{ flex: 1, p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5 }}>
                  {movie.title}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Chip
                    label={movie.rating}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      bgcolor: '#334155',
                      color: '#cbd5e1',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {movie.genre} • {movie.runtime}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} sx={{ mb: 1.5 }}>
                  {movie.formats.map((fmt) => (
                    <Chip
                      key={fmt}
                      label={fmt}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        bgcolor: 'rgba(245, 158, 11, 0.15)',
                        color: '#f59e0b',
                        fontWeight: 700,
                      }}
                    />
                  ))}
                </Stack>

                <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', mb: 0.5, fontWeight: 600 }}>
                  Select Showtime to Book:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {movie.showtimes.map((time) => (
                    <Button
                      key={time}
                      size="small"
                      variant="outlined"
                      startIcon={<MdAccessTime style={{ fontSize: 13 }} />}
                      onClick={() => openBooking(cinema, movie, time)}
                      sx={{
                        color: '#f8fafc',
                        borderColor: '#475569',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        px: 1,
                        py: 0.3,
                        bgcolor: '#1e293b',
                        '&:hover': {
                          borderColor: '#f59e0b',
                          bgcolor: '#f59e0b',
                          color: '#000',
                        },
                      }}
                    >
                      {time}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ borderColor: '#334155', my: 2 }} />

      {/* Customer Reviews Section */}
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <MdRateReview style={{ color: '#fbbf24', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff' }}>
            Customer Reviews
          </Typography>
        </Stack>

        {/* Existing Reviews */}
        <Stack spacing={1.5} sx={{ mb: 2.5 }}>
          {reviewsList.map((rev, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: '#1e293b',
                p: 1.5,
                borderRadius: 2,
                border: '1px solid #334155',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                  {rev.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {rev.date}
                </Typography>
              </Stack>
              <Rating value={rev.rating} size="small" precision={0.5} readOnly sx={{ mb: 0.5 }} />
              <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.85rem' }}>
                "{rev.comment}"
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Add Review Form */}
        <Box
          component="form"
          onSubmit={handleAddReview}
          sx={{
            bgcolor: '#131b2e',
            p: 2,
            borderRadius: 2,
            border: '1px solid #334155',
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b', mb: 1 }}>
            Write a Customer Review
          </Typography>

          {reviewSubmitted && (
            <Alert severity="success" sx={{ mb: 1.5, bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              Thank you! Your review has been added.
            </Alert>
          )}

          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Rating:
              </Typography>
              <Rating
                value={newReviewRating}
                onChange={(_, val) => setNewReviewRating(val || 5)}
                size="small"
              />
            </Stack>

            <TextField
              size="small"
              placeholder="Your Name (optional)"
              value={newReviewName}
              onChange={(e) => setNewReviewName(e.target.value)}
              InputProps={{
                sx: {
                  fontSize: '0.85rem',
                  bgcolor: '#1e293b',
                  color: '#fff',
                  borderRadius: 1.5,
                  '& fieldset': { borderColor: '#334155' },
                },
              }}
            />

            <TextField
              size="small"
              multiline
              rows={2}
              placeholder="Share your experience (seating, popcorn, screen, sound)..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              required
              InputProps={{
                sx: {
                  fontSize: '0.85rem',
                  bgcolor: '#1e293b',
                  color: '#fff',
                  borderRadius: 1.5,
                  '& fieldset': { borderColor: '#334155' },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="small"
              startIcon={<MdSend />}
              sx={{
                bgcolor: '#f59e0b',
                color: '#000',
                fontWeight: 700,
                alignSelf: 'flex-start',
                '&:hover': { bgcolor: '#fbbf24' },
              }}
            >
              Post Review
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default CinemaDetailView;
