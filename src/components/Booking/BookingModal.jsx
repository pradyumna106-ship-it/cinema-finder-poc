import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import {
  MdClose,
  MdConfirmationNumber,
  MdCheckCircle,
  MdPrint,
} from 'react-icons/md';
import { useCinemaContext } from '../../context/CinemaContext';
import { CONCESSION_ITEMS } from '../../data/cinemaDetails';

const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 8;
const PRESET_BOOKED_SEATS = ['A3', 'A4', 'C2', 'C6', 'D4', 'D5'];

const BookingModal = () => {
  const { bookingModal, closeBooking } = useCinemaContext();
  const { isOpen, cinema, movie, showtime } = bookingModal;

  // Booking form state
  const [ticketCounts, setTicketCounts] = useState({ adult: 1, child: 0, concession: 0 });
  const [selectedSeats, setSelectedSeats] = useState(['C3']);
  const [selectedConcessions, setSelectedConcessions] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !cinema || !movie) return null;

  const basePrice = cinema.ticketPrice || 18.5;
  const adultPrice = basePrice;
  const childPrice = Number((basePrice * 0.7).toFixed(2));
  const concessionPrice = Number((basePrice * 0.85).toFixed(2));

  const totalTickets =
    ticketCounts.adult + ticketCounts.child + ticketCounts.concession;

  const ticketsTotal =
    ticketCounts.adult * adultPrice +
    ticketCounts.child * childPrice +
    ticketCounts.concession * concessionPrice;

  const concessionsTotal = Object.entries(selectedConcessions).reduce(
    (acc, [id, qty]) => {
      const item = CONCESSION_ITEMS.find((c) => c.id === id);
      return acc + (item ? item.price * qty : 0);
    },
    0
  );

  const grandTotal = ticketsTotal + concessionsTotal;

  const handleSeatClick = (seatId) => {
    if (PRESET_BOOKED_SEATS.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= totalTickets) {
        // Replace first selected or alert
        const newSeats = [...selectedSeats.slice(1), seatId];
        setSelectedSeats(newSeats);
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const handleConcessionChange = (id, delta) => {
    const current = selectedConcessions[id] || 0;
    const next = Math.max(0, current + delta);
    setSelectedConcessions({ ...selectedConcessions, [id]: next });
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (totalTickets <= 0) return;
    const ref = `CNM-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsConfirmed(true);
  };

  const handleModalClose = () => {
    setIsConfirmed(false);
    setSelectedSeats(['C3']);
    setTicketCounts({ adult: 1, child: 0, concession: 0 });
    setSelectedConcessions({});
    setCustomerName('');
    setCustomerEmail('');
    closeBooking();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleModalClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f172a',
          color: '#f8fafc',
          borderRadius: 3,
          border: '1px solid #334155',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle sx={{ p: 2, bgcolor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#f59e0b', lineHeight: 1.2 }}>
              {isConfirmed ? 'Booking Confirmed! 🎉' : 'Book Movie Tickets'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
              {movie.title} • {cinema.name}
            </Typography>
          </Box>
          <IconButton onClick={handleModalClose} sx={{ color: '#94a3b8' }}>
            <MdClose />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {isConfirmed ? (
          /* Confirmation Digital Ticket Pass */
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Box
              sx={{
                maxWidth: 480,
                mx: 'auto',
                p: 3,
                borderRadius: 3,
                bgcolor: '#131b2e',
                border: '2px dashed #f59e0b',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <MdCheckCircle style={{ color: '#10b981', fontSize: 48, marginBottom: 8 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5 }}>
                Your Ticket is Ready!
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                Booking Reference:{' '}
                <strong style={{ color: '#f59e0b', letterSpacing: 1 }}>{bookingRef}</strong>
              </Typography>

              <Divider sx={{ borderColor: '#334155', my: 2 }} />

              <Stack spacing={1.5} sx={{ textAlign: 'left', mb: 2.5 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    MOVIE & THEATER
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ffffff' }}>
                    {movie.title} ({movie.rating})
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                    {cinema.name} • Auditorium 4
                  </Typography>
                </Box>

                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      DATE & SHOWTIME
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                      Today • {showtime}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      SEAT NUMBERS
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#38bdf8' }}>
                      {selectedSeats.join(', ')}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      CUSTOMER
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                      {customerName || 'Guest'} ({customerEmail || 'Confirmation sent'})
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      TOTAL PAID
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#10b981' }}>
                      ${grandTotal.toFixed(2)} AUD
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              {/* Barcode Mockup */}
              <Box
                sx={{
                  bgcolor: '#ffffff',
                  p: 1.5,
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    height: 38,
                    width: '85%',
                    background:
                      'repeating-linear-gradient(90deg, #000 0, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 8px, transparent 8px, transparent 11px)',
                  }}
                />
                <Typography variant="caption" sx={{ color: '#000', fontWeight: 700, letterSpacing: 2, mt: 0.5 }}>
                  {bookingRef}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          /* Multi-Step Booking Flow */
          <Stack spacing={3}>
            {/* 1. Ticket Quantities */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b', mb: 1 }}>
                1. SELECT TICKETS
              </Typography>
              <Stack spacing={1}>
                {[
                  { key: 'adult', label: 'Adult Ticket', price: adultPrice },
                  { key: 'child', label: 'Child Ticket (under 14)', price: childPrice },
                  { key: 'concession', label: 'Student / Concession', price: concessionPrice },
                ].map((tier) => (
                  <Stack
                    key={tier.key}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1.5,
                      bgcolor: '#1e293b',
                      borderRadius: 2,
                      border: '1px solid #334155',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                        {tier.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        ${tier.price.toFixed(2)} each
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          setTicketCounts({
                            ...ticketCounts,
                            [tier.key]: Math.max(0, ticketCounts[tier.key] - 1),
                          })
                        }
                        sx={{ minWidth: 32, p: 0.5, color: '#f8fafc', borderColor: '#475569' }}
                      >
                        -
                      </Button>
                      <Typography sx={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>
                        {ticketCounts[tier.key]}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          setTicketCounts({
                            ...ticketCounts,
                            [tier.key]: ticketCounts[tier.key] + 1,
                          })
                        }
                        sx={{ minWidth: 32, p: 0.5, color: '#f8fafc', borderColor: '#475569' }}
                      >
                        +
                      </Button>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* 2. Interactive Seating Chart */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                  2. SELECT SEATS ({selectedSeats.length}/{totalTickets} selected)
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 12, height: 12, bgcolor: '#334155', borderRadius: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>Available</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 12, height: 12, bgcolor: '#f59e0b', borderRadius: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#f59e0b' }}>Selected</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 12, height: 12, bgcolor: '#ef4444', opacity: 0.4, borderRadius: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#64748b' }}>Reserved</Typography>
                  </Stack>
                </Stack>
              </Stack>

              {/* Theater Screen Curved Graphic */}
              <Box sx={{ textAlign: 'center', mb: 2, mt: 1 }}>
                <Box
                  sx={{
                    height: 4,
                    width: '75%',
                    mx: 'auto',
                    bgcolor: '#38bdf8',
                    borderRadius: 2,
                    boxShadow: '0 0 12px #38bdf8',
                    mb: 0.5,
                  }}
                />
                <Typography variant="caption" sx={{ color: '#38bdf8', letterSpacing: 2, fontWeight: 700 }}>
                  CINEMA SCREEN
                </Typography>
              </Box>

              {/* Grid of Seats */}
              <Stack spacing={0.8} alignItems="center">
                {SEAT_ROWS.map((row) => (
                  <Stack key={row} direction="row" spacing={0.8} alignItems="center">
                    <Typography sx={{ width: 18, color: '#64748b', fontSize: '0.75rem', fontWeight: 700 }}>
                      {row}
                    </Typography>
                    {Array.from({ length: SEATS_PER_ROW }).map((_, idx) => {
                      const seatId = `${row}${idx + 1}`;
                      const isReserved = PRESET_BOOKED_SEATS.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <Box
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            cursor: isReserved ? 'not-allowed' : 'pointer',
                            bgcolor: isSelected
                              ? '#f59e0b'
                              : isReserved
                              ? 'rgba(239, 68, 68, 0.2)'
                              : '#1e293b',
                            color: isSelected
                              ? '#000'
                              : isReserved
                              ? '#ef4444'
                              : '#cbd5e1',
                            border: '1px solid',
                            borderColor: isSelected
                              ? '#f59e0b'
                              : isReserved
                              ? 'rgba(239, 68, 68, 0.4)'
                              : '#334155',
                            transition: 'all 0.15s',
                            '&:hover': {
                              transform: isReserved ? 'none' : 'scale(1.1)',
                              borderColor: '#f59e0b',
                            },
                          }}
                          title={`Seat ${seatId}`}
                        >
                          {idx + 1}
                        </Box>
                      );
                    })}
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* 3. Cinema Snacks & Concessions */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b', mb: 1 }}>
                3. SNACKS & DRINKS (OPTIONAL)
              </Typography>
              <Stack spacing={1}>
                {CONCESSION_ITEMS.slice(0, 3).map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1.2,
                      bgcolor: '#1e293b',
                      borderRadius: 2,
                      border: '1px solid #334155',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleConcessionChange(item.id, -1)}
                        sx={{ minWidth: 28, p: 0.3, color: '#f8fafc', borderColor: '#475569' }}
                      >
                        -
                      </Button>
                      <Typography sx={{ fontWeight: 700, minWidth: 18, textAlign: 'center' }}>
                        {selectedConcessions[item.id] || 0}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleConcessionChange(item.id, 1)}
                        sx={{ minWidth: 28, p: 0.3, color: '#f8fafc', borderColor: '#475569' }}
                      >
                        +
                      </Button>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {/* 4. Customer Details */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f59e0b', mb: 1 }}>
                4. YOUR DETAILS
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <TextField
                  fullWidth
                  size="small"
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  InputLabelProps={{ sx: { color: '#94a3b8' } }}
                  InputProps={{
                    sx: {
                      bgcolor: '#1e293b',
                      color: '#ffffff',
                      borderRadius: 1.5,
                      '& fieldset': { borderColor: '#334155' },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Email for Tickets"
                  placeholder="e.g. jane@example.com"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  InputLabelProps={{ sx: { color: '#94a3b8' } }}
                  InputProps={{
                    sx: {
                      bgcolor: '#1e293b',
                      color: '#ffffff',
                      borderRadius: 1.5,
                      '& fieldset': { borderColor: '#334155' },
                    },
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        )}
      </DialogContent>

      {/* Dialog Footer Actions */}
      <DialogActions sx={{ p: 2, bgcolor: '#1e293b', borderTop: '1px solid #334155', justifyContent: 'space-between' }}>
        {isConfirmed ? (
          <>
            <Button
              variant="outlined"
              startIcon={<MdPrint />}
              onClick={() => window.print()}
              sx={{ color: '#f8fafc', borderColor: '#475569' }}
            >
              Print Ticket
            </Button>
            <Button
              variant="contained"
              onClick={handleModalClose}
              sx={{ bgcolor: '#f59e0b', color: '#000', fontWeight: 700, '&:hover': { bgcolor: '#fbbf24' } }}
            >
              Done
            </Button>
          </>
        ) : (
          <>
            <Box>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Total Payable:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981', lineHeight: 1 }}>
                ${grandTotal.toFixed(2)} AUD
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button onClick={handleModalClose} sx={{ color: '#94a3b8' }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={totalTickets === 0}
                onClick={handleConfirmBooking}
                startIcon={<MdConfirmationNumber />}
                sx={{
                  bgcolor: '#e50914',
                  color: '#ffffff',
                  fontWeight: 700,
                  px: 3,
                  '&:hover': { bgcolor: '#b91c1c' },
                }}
              >
                Confirm & Pay
              </Button>
            </Stack>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
