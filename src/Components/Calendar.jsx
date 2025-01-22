import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar({ open }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar className={`${!open ? "opacity-0 -translate-x-10 overflow-x-hidden duration-500 delay-100" : "opacity-1 translate-x-0 duration-500 delay-100"}`}
                sx={{
                    width: '200px',
                    height: '250px',
                    '& .MuiPickersDay-root': {
                        color: 'white',
                    },
                    '& .css-q5we01-MuiDayCalendar-root': {
                        marginTop: '15px',
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
                        border: '1px solid white',
                        color: 'white',
                    },
                    '& .MuiPickersCalendarHeader-root': {
                        display: 'none',
                    },
                    '& .css-17f9e7e-MuiTypography-root-MuiDayCalendar-weekDayLabel': {
                        color: 'white',
                    },
                }}
            />
        </LocalizationProvider>
    );
}

