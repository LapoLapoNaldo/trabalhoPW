import { timelineItems } from "@/components/data";
import SectionContainer from "@/components/SectionContainer";

const accents = [
  { dot: "bg-pride-yellow", glow: "shadow-[0_0_30px_rgba(255,244,48,0.6)]", text: "text-pride-yellow" },
  { dot: "bg-pride-purple", glow: "shadow-[0_0_30px_rgba(156,89,209,0.6)]", text: "text-pride-lilac" },
  { dot: "bg-pride-cyan", glow: "shadow-[0_0_30px_rgba(53,231,210,0.6)]", text: "text-pride-cyan" },
  { dot: "bg-pride-pink", glow: "shadow-[0_0_30px_rgba(255,106,174,0.6)]", text: "text-pride-pink" },
  { dot: "bg-pride-blue", glow: "shadow-[0_0_30px_rgba(91,206,250,0.6)]", text: "text-pride-blue" }
];

export default function Timeline() {
  return (
    <SectionContainer
      id="historia"
      index="04"
      eyebrow="Memória também é cuidado"
      title={
        <>
          Datas que{" "}
          <em className="italic-display text-gradient-pride">construíram orgulho.</em>
        </>
      }
      hint="Linha do tempo curta · não cabe tudo, mas cabe afeto."
      description="Orgulho nasce de afeto e coragem coletiva. Pequena curadoria de marcos que ajudam a entender de onde a gente vem."
      className="bg-black/15"
    >
      <div className="relative">
        {/* Vertical luminous line */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-2 hidden h-[calc(100%-2rem)] w-px md:block"
        >
          <div className="h-full w-full bg-gradient-to-b from-pride-yellow via-pride-purple to-pride-cyan opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-pride-yellow via-pride-purple to-pride-cyan opacity-40 blur-md" />
        </div>

        <ol className="relative grid gap-6">
          {timelineItems.map((item, index) => {
            const tone = accents[index % accents.length];
            return (
              <li
                key={`${item.year}-${item.title}`}
                className="relative md:pl-16"
              >
                {/* Marker dot */}
                <span
                  aria-hidden="true"
                  className={`absolute left-1.5 top-7 hidden h-5 w-5 rounded-full ${tone.dot} ${tone.glow} ring-4 ring-[#08060f] md:block`}
                />
                {/* Connector spark */}
                <span
                  aria-hidden="true"
                  className="absolute left-3.5 top-7 hidden h-5 w-px bg-gradient-to-r from-white/40 to-transparent md:block"
                />

                <article className="card-premium grid gap-6 p-7 sm:p-8 md:grid-cols-[auto_1fr]">
                  <div className="flex flex-col items-start gap-3">
                    <span className="font-display text-[10px] italic text-white/45">
                      {String(index + 1).padStart(2, "0")} · marco
                    </span>
                    <span
                      className={`font-display text-[2.4rem] font-light leading-none tracking-editorial text-white sm:text-[3rem]`}
                    >
                      <span className={tone.text}>{item.year}</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-light leading-tight tracking-editorial text-white sm:text-[1.7rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] leading-relaxed text-white/72 text-pretty">
                      {item.body}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionContainer>
  );
}
