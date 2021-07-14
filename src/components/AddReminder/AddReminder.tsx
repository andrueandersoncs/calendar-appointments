import React, { useCallback, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core';
import {convertDateToInputString} from '../../utils/dateUtils'
import { Reminder } from './AddReminderContainer'

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '0px',
		display: 'flex',
		flexDirection: 'column'
	},
	addReminderFormField: {
		marginTop: '10px',
		marginBottom: '10px'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	}
});

interface Props extends WithStyles<typeof styles>{
	isOpen: boolean,
	onClose: () => void,
	onAddReminder: (reminder: Reminder) => void
}

// these are deterministic, they could be memoized
const checkTitleError = (title: string): boolean => title.length > 30
const checkSubmitDisabled = (title: string): boolean => !title || checkTitleError(title)
export const createReminderKey = (reminder: Reminder) => `${reminder.title}${reminder.datetime}`

const DEFAULT_TITLE = ''
const DEFAULT_DATETIME = convertDateToInputString(new Date())
const DEFAULT_COLOR = '#b79a9a'

const AddReminder = React.memo((props: Props) => {
	const { classes, isOpen, onClose, onAddReminder } = props;

	const [title, setTitle] = useState(DEFAULT_TITLE);
	const [datetime, setDatetime] = useState(DEFAULT_DATETIME);
	const [color, setColor] = useState(DEFAULT_COLOR);
	
	const titleError = checkTitleError(title)

	// a real form library like formik would be a better approach to form state management
	const onChangeTitle = useCallback((e) => {
		setTitle(e.target.value);
	}, [setTitle]);

	const onChangeDatetime = useCallback((e) => {
		setDatetime(e.target.value);
	}, [setDatetime]);

	const onChangeColor = useCallback((e) => {
		setColor(e.target.value);
	}, [setColor]);

	const onClickAddReminder = useCallback(() => {
		onAddReminder({
			title,
			datetime,
			color
		})
		onClose()
	}, [onAddReminder, title, datetime, color, onClose])

	const clearForm = useCallback(() => {
		setTitle(DEFAULT_TITLE)
		setColor(DEFAULT_COLOR)
		setDatetime(DEFAULT_DATETIME)
	}, [setTitle, setColor, setDatetime])

	// this is just a nice-to-have, it's safe to remove
	useEffect(clearForm, [isOpen])

	return (
		<Dialog
			open={ isOpen }
			onClose={onClose}
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				Add Reminder
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addReminderFormContainer }>
				<FormControl className={ classes.addReminderFormField }>
					<TextField
						id="reminder-title"
						type="text"
						value={title}
						onChange={onChangeTitle}
						error={titleError}
						label="Reminder Title"
						helperText={titleError && 'Title must be 30 characters or less.'}
					/>
					<FormHelperText id="reminder-title-helper-text">
						This will display as text in the calendar month view.
					</FormHelperText>
				</FormControl>
				<FormControl className={ classes.addReminderFormField }>
					<InputLabel htmlFor="reminder-color">Reminder Color</InputLabel>
					<Input
						id="reminder-color"
						type="color"
						value={color}
						onChange={onChangeColor}
					/>
					<FormHelperText id="reminder-color-helper-text">
						Your reminder will have a background with this color.
					</FormHelperText>
				</FormControl>
				<FormControl className={ classes.addReminderFormField }>
					<InputLabel htmlFor="reminder-datetime">Reminder Date &amp; Time</InputLabel>
					<Input
						id="reminder-datetime"
						type="datetime-local"
						value={datetime}
						onChange={onChangeDatetime}
					/>
					<FormHelperText id="reminder-datetime-helper-text">
						This is the date and time of your reminder.
					</FormHelperText>
				</FormControl>
				<FormControl className={ classes.addReminderFormField }>
					<Button
						variant="contained"
						color="primary"
						disabled={checkSubmitDisabled(title)}
						onClick={onClickAddReminder}
					>Add Reminder</Button>
				</FormControl>
			</DialogContent>
		</Dialog>
	);
})

export default withStyles(styles)( AddReminder );
