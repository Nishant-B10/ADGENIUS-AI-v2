export function exportCopyToText(content) {
  if (typeof window !== 'undefined' && content) {
    const { headlines, bodyCopy, ctas } = content;

    const copyContent = [
      `Headlines:\n- ${headlines.join('\n- ')}`,
      `\nBody Copy:\n${bodyCopy.opening}\n${bodyCopy.middle}\n${bodyCopy.closing}`,
      `\nCalls-to-Action:\n- ${ctas.join('\n- ')}`
    ].join('\n\n');

    const element = document.createElement('a');
    const file = new Blob([copyContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'adgenius_copy.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
