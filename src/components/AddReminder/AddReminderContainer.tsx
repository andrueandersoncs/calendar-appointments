import { connect } from 'react-redux';
import AddReminder from './AddReminder';
import { closeAddReminder, createReminder } from '../../redux/actions';

/*
	I highly recommend a library like @reduxjs/toolkit to reduce boilerplate like this.
		At the very least we should make use of the redux-actions package
		see: https://redux.js.org/style-guide/style-guide#use-redux-toolkit-for-writing-redux-logic

	I also recommend taking the "ducks" a.k.a. "feature folders" approach to state management
		instead of having a file for "actions.ts" "reducers.ts" "selectors.ts" "sagas.ts" etc.
		see: https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic

	Hopefully I'm not sounding like a broken record, but I'm a bit surprised;
		I recommend organizing state according to data type, not components.
		see: https://redux.js.org/style-guide/style-guide#organize-state-structure-based-on-data-types-not-components

	That being said, I'll follow the conventions I see for the sake of this assignment
*/

interface State {
	addReminderStatus: {
		isOpen: boolean,
		reminders: Reminder[]
	}
}

const mapStateToProps = (state: State) => {
	return { 
		isOpen: state.addReminderStatus.isOpen
	};
}

export type Reminder = {
	title: string;
	color: string;
	datetime: string;
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		},
		onAddReminder: (reminder: Reminder) => {
			dispatch( createReminder(reminder) )
		}
	}
}

const AddReminderContainer = connect( mapStateToProps, mapDispatchToProps )( AddReminder );

export default AddReminderContainer;
