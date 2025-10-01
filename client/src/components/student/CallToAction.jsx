import { ArrowRight } from "lucide-react"

const CallToAction = () => {
  return (
    <div className="flex flex-col text-center items-center justify-center gap-10 mb-20">
      <div>
        <h1 className="text-xl font-bold sm:text-3xl mb-4">Ready to Take the Next Step?</h1>
        <p className="text-gray-600 sm:text-lg">Join thousands of learners and start your journey toward mastering new skills today.</p>
      </div>
      <div className="flex gap-3">
        <button className="border p-4 sm:py-3 sm:px-6 rounded bg-blue-800 text-white font-semibold sm:font-bold cursor-pointer">Get started</button>
        <button className="text-black font-semibold sm:font-bold flex items-center p-4 sm:py-3 sm:px-6 rounded bg-gray-100 cursor-pointer">Learn more <ArrowRight /></button>
      </div>
    </div>
  )
}

export default CallToAction
