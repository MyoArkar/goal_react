import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                sx={{
                    width: '200px',
                    height: '250px',
                    '& .MuiPickersDay-root': {
                        color: 'white',
                    },
                    '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: 'gray',
                    },
                    '& .MuiPickersDay-root:hover': {
                        backgroundColor: 'gray',
                    },
                    '& .MuiPickersDay-root.Mui-selected:hover': {
                        backgroundColor: 'gray',
                    },
                    '& .MuiPickersDay-root.MuiPickersDay-today': {
                        border: '1px solid white', // Add border to today date
                        color: 'white', // Change color of today date
                    },
                    '& .MuiPickersCalendarHeader-root': {
                        display: 'none',
                    },
                    '& .MuiPickersCalendarHeader-dayLabel': {
                        color: 'white', // Correct class selector for date labels
                    },
                }}
            />
        </LocalizationProvider>
    );
}

