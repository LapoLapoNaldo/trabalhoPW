import { InfoCard } from "@/components/Cards";
import { educationCards, myths } from "@/components/data";
import SectionContainer from "@/components/SectionContainer";

export default function EducationSection() {
  return (
    <SectionContainer
      id="nao-binario"
      index="01"
      eyebrow="Aprender com cuidado"
      title={
        <>
          O que é ser{" "}
          <em className="italic-display text-gradient-pride">não-binárie</em>?
        </>
      }
      hint="Identidade é uma experiência íntima, social e viva."
      description="Sem caixinhas rígidas, sem fórmula universal. O que existe é pluralidade de jeitos honestos de habitar um corpo, um nome e o mundo."
    >
      {/* Asymmetric editorial grid */}
      <div className="grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <InfoCard
            index="01"
            eyebrow={educationCards[0].eyebrow}
            title={educationCards[0].title}
            body={educationCards[0].body}
            accent={educationCards[0].accent}
            size="tall"
          />
        </div>
        <div className="grid gap-5 lg:col-span-5">
          <InfoCard
            index="02"
            eyebrow={educationCards[1].eyebrow}
            title={educationCards[1].title}
            body={educationCards[1].body}
            accent={educationCards[1].accent}
          />
          <InfoCard
            index="03"
            eyebrow={educationCards[2].eyebrow}
            title={educationCards[2].title}
            body={educationCards[2].body}
            accent={educationCards[2].accent}
          />
        </div>
        <div className="lg:col-span-12">
          <InfoCard
            index="04"
            eyebrow={educationCards[3].eyebrow}
            title={educationCards[3].title}
            body={educationCards[3].body}
            accent={educationCards[3].accent}
            size="wide"
          />
        </div>
      </div>

      {/* Cotidiano + Mitos */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <article className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
          <div className="kicker mb-6">Como falar bonito</div>
          <h3 className="font-display text-3xl font-light leading-tight tracking-editorial text-white sm:text-4xl">
            Pequenas frases,{" "}
            <em className="italic-display text-pride-lilac">grandes pontes.</em>
          </h3>
          <ul className="mt-7 grid gap-3">
            {[
              "Como você prefere ser chamade?",
              "Posso usar elu/delu?",
              "Obrigade por me corrigir. Vou usar certo daqui pra frente."
            ].map((phrase, idx) => (
              <li
                key={phrase}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-500 ease-cinema hover:-translate-y-0.5 hover:border-pride-yellow/40 hover:bg-white/[0.06]"
              >
                <span className="mt-1.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 font-display text-[10px] italic text-white/55">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-lg italic text-white/85">
                  &ldquo;{phrase}&rdquo;
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="relative overflow-hidden rounded-[2rem] border border-pride-yellow/25 p-6 sm:p-9"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,244,48,0.08), rgba(255,244,48,0.02) 60%), rgba(20,14,8,0.6)"
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 rounded-full bg-pride-yellow/15 blur-3xl lg:block"
          />
          <div className="kicker mb-6 text-pride-yellow/80">
            Mitos x Realidade
          </div>
          <h3 className="font-display text-3xl font-light leading-tight tracking-editorial text-pride-yellow sm:text-4xl">
            Respondidos com{" "}
            <em className="italic-display text-white">respeito.</em>
          </h3>

          <ul className="mt-7 grid gap-3">
            {myths.map((myth, idx) => {
              const [mythText, realityText] = myth.split("Realidade:");
              return (
                <li
                  key={myth}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5 leading-relaxed"
                >
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/45">
                    <span className="font-display italic text-pride-yellow/80">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    Mito
                  </div>
                  <p className="mt-2 text-white/82">
                    {mythText.replace("Mito:", "").trim()}
                  </p>
                  {realityText ? (
                    <>
                      <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-pride-yellow/80">
                        <span className="h-px w-6 bg-pride-yellow/60" />
                        Realidade
                      </div>
                      <p className="mt-2 font-display italic text-white">
                        {realityText.trim()}
                      </p>
                    </>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </SectionContainer>
  );
}
