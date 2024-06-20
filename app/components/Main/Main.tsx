"use client"

import { useEffect, useState } from "react"
import { getResponse } from "../../actions"

export const dynamic = "force-dynamic"
export const maxDuration = 30

export default function Home() {
    interface Generation {
        insults: string[]
    }

    const [generation, setGeneration] = useState<Generation>({ insults: [] })
    const [currentInsult, setCurrentInsult] = useState<string>("")
    const [currentInsultNumber, setCurrentInsultNumber] = useState<number>(0)
    const [insults, setInsults] = useState<boolean>(false)
    const [insultsExceeded, setInsultsExceeded] = useState<boolean>(true)
    const [firstRequest, setFirstRequest] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!generation || generation.insults.length === 0) return
        setCurrentInsult(generation.insults[currentInsultNumber])
        if (currentInsultNumber === generation.insults.length - 1) {
            setInsultsExceeded(true)
        }
    }, [currentInsultNumber, generation])

    const handleGenerateInsults = async () => {
        setLoading(true)
        const { object } = await getResponse("Generate me 5 funny medieval/fancy insults.")

        setGeneration((prevGeneration) => ({
            insults: [...prevGeneration.insults, ...object.insults],
        }))

        setInsults(true)
        setInsultsExceeded(false)
        setCurrentInsultNumber(generation.insults.length)
        !firstRequest && setFirstRequest(true)

        setLoading(false)
    }

    return (
        <section className="py-20">
            <div className="inner text-center">
                <div>
                    {loading && <p>Loading...</p>}
                    {generation.insults.length > 0 && (
                        <div className="py-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-serif">{currentInsult}</h2>
                        </div>
                    )}
                </div>

                {insultsExceeded && (
                    <button className="bg-blue-600 px-10 py-5 rounded-xl text-white font-bold hover:bg-blue-700 transition-colors duration-200 ease-in-out" onClick={handleGenerateInsults}>
                        {firstRequest ? "More!" : "Generate insults"}
                    </button>
                )}

                {insults && !insultsExceeded && (
                    <div>
                        <button
                            className="bg-blue-600 px-5 py-2 rounded-xl text-white font-bold hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                            onClick={() => setCurrentInsultNumber((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
