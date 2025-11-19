export default function RunningTxt({ running_text }: { running_text: string }) {
    return (
        <div className="overflow-hidden whitespace-nowrap bg-white text-black py-2 uppercase font-semibold">
            <div
                className="inline-block"
                style={{
                    animation: `marquee 60s linear infinite`,
                }}
            >
                {running_text}
            </div>

            {/* Animasi */}
            <style>
                {`
                @keyframes marquee {
                    0%   { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                `}
            </style>
        </div>
    );
}
