export const deleteHtmlTags = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, "");
}
