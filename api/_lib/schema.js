/** Column order for each Google Sheets tab. Only ever append new columns to the
 *  end of a list: existing sheets are read positionally. */
export const sheetHeaders = {
  Bookings: ['bookingId','createdAt','updatedAt','status','flagged','service','date','location','coverage','guests','name','email','phone','message','agreementAccepted','agreementId','notes','archived'],
  Conversations: ['conversationId','createdAt','updatedAt','status','name','email','source','messagesJson','unread','phone'],
  Logs: ['timestamp','actor','action','entityType','entityId','metadataJson'],
  Settings: ['key','value'],
  Portfolio: ['id','createdAt','category','caption','alt','driveId','order']
};

export const sheetTitles = Object.keys(sheetHeaders);
