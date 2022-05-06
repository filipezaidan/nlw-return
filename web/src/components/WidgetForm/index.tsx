import { useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import thoughtImageUrl from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            src: bugImageUrl,
            alt: 'Imagem de um inseto',
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            src: ideaImageUrl,
            alt: 'Imagem de uma lâmpada',
        },
    },
    OTHER: {
        title: 'Outros',
        image: {
            src: thoughtImageUrl,
            alt: 'Imagem de um balão de pensamento',
        },
    },

}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false)

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep
                    onFeedbackRestartRequested={handleRestartFeedback}
                />
            )
                :
                (
                    <>
                        {!feedbackType ? (
                            <FeedbackTypeStep
                                onFeedbackTypeChanged={setFeedbackType}
                            />
                        ) : (
                            <FeedbackContentStep
                                feedbackType={feedbackType}
                                onFeedbackRestartRequested={handleRestartFeedback}
                                onFeedbackSent={() => setFeedbackSent(true)}
                            />
                        )
                        }
                    </>
                )
            }

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pelo <a className="underline underline-offset-2" href='https://github.com/filipezaidan'>Filipe Zaidan</a>
            </footer>
        </div >
    )
}


