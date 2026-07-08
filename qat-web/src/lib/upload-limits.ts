export const ADMIN_MEDIA_MAX_UPLOAD_MB = 50;
export const ADMIN_MEDIA_MAX_UPLOAD_BYTES = ADMIN_MEDIA_MAX_UPLOAD_MB * 1024 * 1024;

export const ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_MB = 50;
export const ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_BYTES =
  ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_MB * 1024 * 1024;

export function fileTooLargeMessage(maxMb: number) {
  return `File must be under ${maxMb} MB.`;
}
