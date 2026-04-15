'use client'

// ** React
import { useEffect, useState } from "react"

// ** shadcn
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "ZTC-countdown-start"
const FOUR_DAYS = 4 * 24 * 60 * 60 * 1000

const CountdownButton = () => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null)

    useEffect(() => {
        let start = localStorage.getItem(STORAGE_KEY)

        if (!start) {
            start = Date.now().toString()
            localStorage.setItem(STORAGE_KEY, start)
        }

        const startTime = Number(start)

        const update = () => {
            const elapsed = Date.now() - startTime
            const remaining = FOUR_DAYS - elapsed
            setTimeLeft(remaining > 0 ? remaining : 0)
        }

        update()

        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
    }, [])

    const formatTime = (ms: number) => {
        const total = Math.floor(ms / 1000)

        const d = Math.floor(total / (24 * 3600))
        const h = Math.floor((total % (24 * 3600)) / 3600)
        const m = Math.floor((total % 3600) / 60)
        const s = total % 60

        return `${d}d ${h}h ${m}m ${s}s`
    }

    if (timeLeft === null) return null

    const isExpired = timeLeft <= 0

    return (
        <Button
            disabled={true}
            variant={isExpired ? "secondary" : "default"}
            className="text-sm font-medium"
        >
            {isExpired
                ? "Beta v1.1"
                : `${formatTime(timeLeft)}`}
        </Button>
    )
}

export default CountdownButton