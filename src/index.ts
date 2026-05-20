import NativeZendesk, {
  type ZendeskConfig,
  type ZendeskCustomField,
  type ZendeskTicketRequest,
  type ZendeskRequest,
  type ZendeskComment,
  type ZendeskUploadResponse,
} from './specs/NativeZendesk';
export { ZendeskHelpCenterView } from './ZendeskHelpCenterView';

export async function initializeZendesk(config: ZendeskConfig): Promise<boolean> {
  return NativeZendesk.initialize(config);
}

export async function getZendeskArticles(
  locale?: string,
  labels?: string[],
  page?: number,
  perPage?: number
) {
  return NativeZendesk.getArticles(locale, labels, page, perPage);
}

export async function getZendeskArticle(articleId: number, locale?: string) {
  return NativeZendesk.getArticle(articleId, locale);
}

export async function searchZendeskArticles(
  query: string,
  locale?: string,
  page?: number,
  perPage?: number
) {
  return NativeZendesk.searchArticles(query, locale, page, perPage);
}

export async function createZendeskTicket(request: ZendeskTicketRequest) {
  return NativeZendesk.createTicket(request);
}

export async function openZendeskHelpCenter() {
  return NativeZendesk.openHelpCenter();
}

export async function openZendeskArticle(articleId: number) {
  return NativeZendesk.openArticle(articleId);
}

export async function openZendeskContactSupport() {
  return NativeZendesk.openContactSupport();
}

export async function openZendeskContactSupportWithDetails(
  email: string,
  customFields: ReadonlyArray<ZendeskCustomField>
) {
  return NativeZendesk.openContactSupportWithDetails(email, customFields);
}

export async function getZendeskLatestRequest(): Promise<ZendeskRequest | null> {
  return NativeZendesk.getLatestRequest();
}

export async function getZendeskRequestComments(requestId: string): Promise<ZendeskComment[]> {
  return NativeZendesk.getRequestComments(requestId);
}

export async function uploadZendeskAttachment(
  filePath: string,
  fileName: string,
  mimeType: string
): Promise<ZendeskUploadResponse> {
  return NativeZendesk.uploadAttachment(filePath, fileName, mimeType);
}

export async function addZendeskComment(
  requestId: string,
  comment: string,
  attachmentTokens?: string[]
): Promise<ZendeskComment> {
  return NativeZendesk.addCommentToRequest(requestId, comment, attachmentTokens);
}

export async function createZendeskRequest(
  subject: string,
  description: string,
  options?: {
    customFields?: ZendeskCustomField[];
    attachmentTokens?: string[];
  }
): Promise<ZendeskRequest> {
  return NativeZendesk.createRequestWithComment(
    subject,
    description,
    options?.customFields,
    options?.attachmentTokens
  );
}

export type { ZendeskCustomField, ZendeskRequest, ZendeskComment, ZendeskUploadResponse };
