import { ResourceCard } from "@/components/Cards";
import { resources } from "@/components/data";
import SectionContainer from "@/components/SectionContainer";

export default function Resources() {
  return (
    <SectionContainer
      id="apoio"
      index="05"
      eyebrow="Rede de apoio"
      title={
        <>
          Recursos e{" "}
          <em className="italic-display text-gradient-pride">lugares seguros.</em>
        </>
      }
      hint="Acolhimento, denúncia, comunidade, cultura, direitos."
      description="Links úteis no Brasil. Nem tudo precisa ser carregado sozinhe — existe gente, rede e canal pronto pra escutar."
    >
      {/* Emergency callout */}
      <article className="relative mb-6 overflow-hidden rounded-[1.5rem] border border-pride-cyan/30 p-6 sm:mb-8 sm:rounded-[1.75rem] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-pride-cyan/12 via-transparent to-pride-purple/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-16 h-48 w-48 rounded-full bg-pride-cyan/20 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-pride-cyan/40 bg-pride-cyan/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.32em] text-pride-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-pride-cyan animate-tickerLight" />
            Sinal de cuidado
          </span>
          <p className="max-w-[68ch] leading-relaxed text-white/82 text-pretty">
            Se você estiver em risco imediato, procure emergência local ou uma
            pessoa de confiança agora. Para sofrimento emocional intenso,{" "}
            <strong className="font-medium text-white">o CVV atende pelo 188</strong>,
            todos os dias, 24 horas.
          </p>
        </div>
      </article>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.title} {...resource} />
        ))}
      </div>
    </SectionContainer>
  );
}
