import { UseChatHelpers } from 'ai/react'
import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 border bg-background p-8">
        <h1 className="text-lg font-semibold">
	Welcome to SteamBot powered by ai steam labs!
        </h1>
        <p className="leading-normal text-sm">        
	Through natural language interactive AI chatbots, market coverage includes: comprehensive data and analysis of cryptocurrencies, stocks, foreign exchange and bonds. Presenting you with all market asset charts, hot asset news, financial details, candle chart analysis and multi-asset price trend comparisons. More features for you to discover!
        </p>
      </div>
    </div>
  )
}
