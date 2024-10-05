import * as React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconArrowRight, IconArrowLeft, IconPlus, IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import type { AI } from '@/lib/chat/actions'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'


export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom, 
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  const exampleMessages = [
    {
      heading: 'Multi-asset price trend comparison',
      subheading: 'of BTC/ETH/SOL?',
      message: 'Multi-asset price trend comparison of BTC/ETH/SOL?'
    },
    {
      heading: 'What is the price',
      subheading: 'of crypto currency CLOUD?',
      message: 'What is the price of crypto currency CLOUD?'
    },    
    {
      heading: 'What is the price',
      subheading: 'of Apple Inc.?',
      message: 'What is the price of Apple stock?'
    },
    {
      heading: 'Show me a stock chart',
      subheading: 'for $GOOGL',
      message: 'Show me a stock chart for $GOOGL'
    }    
  ]

  interface ExampleMessage {
    heading: string
    subheading: string
    message: string
  }

  const [randExamples, setRandExamples] = useState<ExampleMessage[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    const shuffledExamples = [...exampleMessages].sort(
      // () => 1 - Math.random()
    )
    setRandExamples(shuffledExamples)
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            randExamples.map((example, index) => (
              <div
                key={example.heading}
                className={`
                    cursor-pointer border bg-white p-4 
                    hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900
                  `}
                onClick={async () => {
                  setMessages(currentMessages => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>
                    }
                  ])

                  const responseMessage = await submitUserMessage(
                    example.message
                  )
                  setMessages(currentMessages => [
                    ...currentMessages,
                    responseMessage
                  ])
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>
      </div>
        <div className="relative flex mx-auto max-w-2xl px-4 items-center justify-between">
            <div className="flex-grow border-t bg-background px-4 py-2 shadow-lg sm:border md:py-4">
              <PromptForm input={input} setInput={setInput} />
              <FooterText className="hidden sm:block" />
            </div>
      </div>
    </div>)
}
