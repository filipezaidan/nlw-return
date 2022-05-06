import { Camera, Trash } from 'phosphor-react'
import html2canvas from 'html2canvas'
import { useState } from 'react';
import { Loading } from './Loading';

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screen: string | null) => void;
}


export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
    const [isTackingScreenShot, setIsTackingScreenShot] = useState(false)

    async function handleTackScreenshot() {
        setIsTackingScreenShot(true)

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64Image = canvas.toDataURL('image/png');

        onScreenshotTook(base64Image);
        setIsTackingScreenShot(false);
    }

    if (screenshot) {
        return (
            <button
                type='button'
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => onScreenshotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180,
                }}
            >
                <Trash weight='fill' />
            </button>
        )
    }


    return (
        <button
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
            type="button"
            onClick={handleTackScreenshot}
        >
            {isTackingScreenShot ? <Loading /> : <Camera className="w-6 h-6" />}
        </button>
    )
}

