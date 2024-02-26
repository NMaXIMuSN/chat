import { createSelector } from 'reselect';
import { getCurrentChat } from '../getCurrentChat/getCurrentChat';

export const getChatParticipants = createSelector(
  [getCurrentChat],
  (state) => {
    return state?.participants
  }
)