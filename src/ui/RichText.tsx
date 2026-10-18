import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function RichText({ markdown }: { markdown: string }) {
  return (
    <div className="rich-text">
      <ReactMarkdown skipHtml remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
