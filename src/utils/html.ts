import { JSDOM } from 'jsdom'

export const extractText = (html: string) => {
  const dom = new JSDOM(html)

  const get_texts = (node: Node, texts=[] as string[]) => {
    if (node.nodeType === node.TEXT_NODE) {
      texts.push(node.nodeValue ?? '');
    }
    else if (node.nodeType === node.ELEMENT_NODE) {
      for (const child of node.childNodes) {
        get_texts(child, texts);
      }
    }

    return texts;
  }
  return get_texts(dom.window.document.body).join('');
}