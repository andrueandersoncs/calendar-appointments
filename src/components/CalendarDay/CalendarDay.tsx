import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate } from 'date-fns';
import { useSelector } from 'react-redux';
import { getRemindersForDate } from '../../redux/selectors';
import { Chip } from '@material-ui/core';
import {createReminderKey} from '../AddReminder/AddReminder'


const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '7.5vh',
		width: '12.5vw',
		display: 'flex',
		flexDirection: 'column',
		textOverflow: 'ellipsis',
		overflowY: 'auto'
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	onDayClick: (dateObj: DateObj) => void
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, onDayClick } = props;
	const [ focused, setFocused ] = useState(false)

	const isToday = isSameDay( dateObj.date, new Date() );

	// nested ternary operators are nearly impossible to read
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;

	// without useCallback this will cause unnecessary re-renders of any component they're passed to as a prop
	// every time this component function is executed these will be re-declared causing
	// the default shallow (referential) equality checks to return false
	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)

	const getReminders = useSelector(getRemindersForDate)
	const reminders = getReminders(dateObj.date.toISOString())

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( dateObj ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
			<div className={ classes.remindersContainer }>
				{reminders.map(reminder => (
					<Chip
						key={createReminderKey(reminder)}
						style={{backgroundColor: reminder.color}}
						variant="outlined"
						label={reminder.title}
						size="small"
					/>
				))}
			</div>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
