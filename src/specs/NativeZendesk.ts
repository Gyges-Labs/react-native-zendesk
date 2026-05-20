import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type ZendeskConfig = {
  subdomain?: string;
  zendeskUrl?: string;
  appId?: string;
  clientId?: string;
  name?: string;
  email?: string;
  apiToken?: string;
  locale?: string;
};

export type ZendeskTicketRequest = {
  subject: string;
  description: string;
  requesterName?: string;
  requesterEmail?: string;
  tags?: string[];
};

export type ZendeskCustomField = {
  key: string;
  value: string;
};

export type ZendeskRequest = {
  id: string;
  subject: string;
  description: string;
  status: 'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed';
  createdAt: string;
  updatedAt: string;
};

export type ZendeskAttachment = {
  url: string;
  filename: string;
  contentType: string;
};

export type ZendeskComment = {
  id: string;
  body: string;
  authorId: string;
  createdAt: string;
  attachments?: ZendeskAttachment[];
};

export type ZendeskUploadResponse = {
  token: string;
};

export interface Spec extends TurboModule {
  initialize(config: ZendeskConfig): Promise<boolean>;
  getArticles(
    locale?: string,
    labels?: string[],
    page?: number,
    perPage?: number
  ): Promise<Record<string, unknown>>;
  getArticle(articleId: number, locale?: string): Promise<Record<string, unknown>>;
  searchArticles(
    query: string,
    locale?: string,
    page?: number,
    perPage?: number
  ): Promise<Record<string, unknown>>;
  createTicket(request: ZendeskTicketRequest): Promise<Record<string, unknown>>;
  openHelpCenter(): Promise<boolean>;
  openArticle(articleId: number): Promise<boolean>;
  openContactSupport(): Promise<boolean>;
  openContactSupportWithDetails(
    email: string,
    customFields: ReadonlyArray<ZendeskCustomField>
  ): Promise<boolean>;
  getLatestRequest(): Promise<ZendeskRequest | null>;
  getRequestComments(requestId: string): Promise<ZendeskComment[]>;
  uploadAttachment(
    filePath: string,
    fileName: string,
    mimeType: string
  ): Promise<ZendeskUploadResponse>;
  addCommentToRequest(
    requestId: string,
    comment: string,
    attachmentTokens?: string[]
  ): Promise<ZendeskComment>;
  createRequestWithComment(
    subject: string,
    description: string,
    customFields?: ReadonlyArray<ZendeskCustomField>,
    attachmentTokens?: string[]
  ): Promise<ZendeskRequest>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNZendesk');
