import {Reminder} from '../components/AddReminder/AddReminderContainer'

// action types
export const OPEN_AGENDA = 'OPEN_AGENDA';
export const CLOSE_AGENDA = 'CLOSE_AGENDA';
export const OPEN_ADD_REMINDER = 'OPEN_ADD_REMINDER';
export const CLOSE_ADD_REMINDER = 'CLOSE_ADD_REMINDER';
export const CREATE_REMINDER = 'CREATE_REMINDER'

interface DateObj {
	date: Date
}

// These should probably follow the FSA specification
// see: https://redux.js.org/style-guide/style-guide#write-actions-using-the-flux-standard-action-convention

// action creators
export function openAgenda( dateObj: DateObj ) {
	return { type: OPEN_AGENDA, dateObj };
}

export function closeAgenda() {
	return { type: CLOSE_AGENDA };
}

export function openAddReminder( reminder?: any ) {
	return { type: OPEN_ADD_REMINDER, reminder };
}

export function closeAddReminder() {
	return { type: CLOSE_ADD_REMINDER };
}

export function createReminder(reminder: Reminder) {
	return { type: CREATE_REMINDER, payload: reminder };
}
