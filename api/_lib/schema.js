/** Column order for each Google Sheets tab. Only ever append new columns to the
 *  end of a list: existing sheets are read positionally. */
export const sheetHeaders = {
  Bookings: ['bookingId','createdAt','updatedAt','status','flagged','service','date','location','coverage','guests','name','email','phone','message','agreementAccepted','agreementId','notes'],
  Conversations: ['conversationId','createdAt','updatedAt','status','name','email','source','messagesJson','unread'],
  Logs: ['timestamp','actor','action','entityType','entityId','metadataJson'],
  Settings: ['key','value']
};

export const sheetTitles = Object.keys(sheetHeaders);
