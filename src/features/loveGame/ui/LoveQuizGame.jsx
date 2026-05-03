import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperience } from "../../../app/context/ExperienceContext";
import { quizQuestions } from "../../../shared/content/storyContent";
import { Button } from "../../../shared/ui/Button";
import { Card } from "../../../shared/ui/Card";

export function LoveQuizGame() {
  const navigate = useNavigate();
  const { setGameCompleted } = useExperience();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const question = quizQuestions[currentIndex];
  const correctAnswers = useMemo(
    () => selectedAnswers.filter((answer, index) => answer === quizQuestions[index].answer).length,
    [selectedAnswers]
  );

  const handleSelect = (option) => {
    const updated = [...selectedAnswers];
    updated[currentIndex] = option;
    setSelectedAnswers(updated);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((value) => value + 1);
      return;
    }

    setGameCompleted(true);
  };

  const completed = selectedAnswers.length === quizQuestions.length;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-10 sm:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#9a4f64]">Couple game</p>
          <h1 className="font-display text-5xl leading-[0.96] sm:text-6xl">How well do you know us?</h1>
          <p className="max-w-xl text-base leading-8 text-[#7f4458] sm:text-lg">
            A tiny quiz, not to test you, but to smile at the things that already feel so unmistakably ours.
          </p>
          <div className="rounded-[28px] border border-[rgba(126,36,56,0.14)] bg-white/55 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#a25e72]">Progress</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#f4d5da]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f09bb0] to-[#ad314e] transition-[width]"
                style={{ width: `${(selectedAnswers.length / quizQuestions.length) * 100}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-[#7f4458]">
              {completed
                ? `You answered ${correctAnswers} out of ${quizQuestions.length} in the most us way possible.`
                : `Question ${currentIndex + 1} of ${quizQuestions.length}`}
            </p>
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          {!completed ? (
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#9a4f64]">Current card</p>
              <h2 className="mt-4 font-display text-4xl text-[#5b2130]">{question.prompt}</h2>
              <div className="mt-8 grid gap-4">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="rounded-[24px] border border-[rgba(126,36,56,0.14)] bg-white px-5 py-5 text-left text-base leading-7 text-[#6f2639] transition hover:-translate-y-1 hover:border-[rgba(126,36,56,0.3)] hover:shadow-[0_14px_28px_rgba(173,49,78,0.1)]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ffd7df] text-4xl text-[#9a2f49]">
                ❤
              </div>
              <h2 className="mt-6 font-display text-5xl text-[#5b2130]">You already know us better than anyone ❤️</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#7f4458]">
                That is the best part. This was never about right answers. It was about the fact that our story already lives naturally in your heart.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button onClick={() => navigate("/proposal")}>Take Me To The Question</Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedAnswers([]);
                    setCurrentIndex(0);
                    setGameCompleted(false);
                  }}
                >
                  Replay Game
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
