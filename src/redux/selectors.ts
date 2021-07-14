import { isSameDay } from 'date-fns';
import {RootState} from '../index'
import {convertInputStringToDate} from '../utils/dateUtils'

export const getRemindersForDate = (state: RootState) => (date: string) =>
    state.addReminderStatus.reminders
        .filter(reminder => isSameDay(convertInputStringToDate(reminder.datetime), new Date(date)))
        .sort((reminderA, reminderB) =>
            convertInputStringToDate(reminderA.datetime).getTime() - convertInputStringToDate(reminderB.datetime).getTime());