import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

import * as dateFns from 'date-fns';
import { useSelector } from 'react-redux';
import { getRemindersForDate } from '../../redux/selectors';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {createReminderKey} from '../AddReminder/AddReminder'
import EventIcon from '@material-ui/icons/Event';
import { convertInputStringToDate } from '../../utils/dateUtils';

const styles = (theme: Theme) => createStyles({
	remindersContainer: {
		minHeight: '250px',
		marginTop: '10px'
	},
	reminderList: {
		overflowY: 'auto',
		height: '300px',
    	maxHeight: '300px',
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	toolbarButtonHidden: {
		visibility: 'hidden'
	},
	toolbarButtonVisible: {
		visibility: 'visible'
	}
});

interface Props extends WithStyles<typeof styles>{
	agendaStatus: {
		isOpen: boolean,
		date: Date
	}
	onClose: () => void
}

const AgendaDay = (props: Props) => {
	const { classes, agendaStatus, onClose } = props;
	const dateTitle = agendaStatus.date ? dateFns.format( agendaStatus.date, 'LLLL do, yyyy' ) : 'Closing'

	const getReminders = useSelector(getRemindersForDate)
	const reminders = getReminders(agendaStatus?.date?.toISOString())

	return (
		<Dialog
			open={ agendaStatus.isOpen }
			onClose={ onClose }
			aria-labelledby='form-dialog-title'
			fullWidth={ true }
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				Reminders for { dateTitle }
				<IconButton aria-label='Close' className={ classes.closeButton } onClick={ onClose }>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.remindersContainer }>
				<List dense className={ classes.reminderList }>
					{reminders.map(reminder => (
						<React.Fragment key={createReminderKey(reminder)}>
							<ListItem style={{backgroundColor: reminder.color}}>
								<ListItemIcon><EventIcon /></ListItemIcon>
								<ListItemText
									primary={reminder.title}
									secondary={convertInputStringToDate(reminder.datetime).toLocaleString()}
								/>
							</ListItem>
							<Divider />
						</React.Fragment>
					))}
				</List>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles( styles )( AgendaDay );
