import { RefreshCw } from 'lucide-react'

const RefreshButton = () => {
    return (
        <div>
            <button
                onClick={() => window.location.reload()}
                className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
            >
                <RefreshCw size={28} />
            </button>
        </div>
    )
}

export default RefreshButton