import { createSelector } from "reselect";
import { getCurrentChat } from "../getCurrentChat/getCurrentChat";

export const getChatMessages = createSelector(
  [getCurrentChat],
  (chat) => chat?.messages
)