import { AnimatedGradientText } from "@/components/common/animated-gradient-text";
import { AnimatedGroup } from "@/components/common/animated-group";
import { TextEffect } from "@/components/common/text-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const CLIENTS = [
  { name: "Nvidia", logo: "/images/assets/nvidia.svg", width: 120, height: 20 },
  { name: "Column", logo: "/images/assets/column.svg", width: 110, height: 16 },
  { name: "GitHub", logo: "/images/assets/github.svg", width: 110, height: 16 },
  { name: "Nike", logo: "/images/assets/nike.svg", width: 120, height: 20 },
  {
    name: "Lemon Squeezy",
    logo: "/images/assets/lemonsqueezy.svg",
    width: 120,
    height: 20,
  },
  {
    name: "Laravel",
    logo: "/images/assets/laravel.svg",
    width: 110,
    height: 16,
  },
  { name: "Lilly", logo: "/images/assets/lilly.svg", width: 130, height: 28 },
  { name: "OpenAI", logo: "/images/assets/openai.svg", width: 125, height: 24 },
];

interface HeroSectionProps {
  badge?: {
    text: string;
    href: string;
  };
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  badge = { text: "System Status: Online", href: "#link" },
  title = "Lucideus",
  description = "Secure your restricted zones. Instantly detect unauthorized data transfer, isolate blacklisted sources, and neutralize contraband assets in real time.",
  primaryCta = { text: "Start Defense Protocol", href: "#link" },
  secondaryCta = { text: "View Intelligence", href: "#link" },
}: HeroSectionProps) {
  return (
    <>
      <main className="overflow-hidden text-foreground">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-section-sm md:pt-section-lg">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring" as const,
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32"
            >
              <Image
                src="/images/hero-bg.jpg"
                alt="background"
                fill
                className="hidden size-full object-cover dark:block"
                sizes="100vw"
                priority
              />
            </AnimatedGroup>

            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href={badge.href}
                    className="hover:bg-background dark:hover:border-t-border bg-muted/80 group mx-auto flex w-fit items-center gap-4 rounded-full border border-border/40 p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <Sparkles className="size-4 shrink-0 text-orange-500" />
                    <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500/50" />
                    <AnimatedGradientText className="text-sm font-medium">
                      {badge.text}
                    </AnimatedGradientText>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl lg:mt-16 xl:text-[5.5rem]"
                >
                  {title}
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  {description}
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link href={primaryCta.href}>
                        <span className="text-nowrap">{primaryCta.text}</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5"
                  >
                    <Link href={secondaryCta.href}>
                      <span className="text-nowrap">{secondaryCta.text}</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <Image
                    className="bg-background aspect-15/8 relative hidden rounded-2xl object-cover dark:block"
                    src="/images/bg-hero.jpg"
                    alt="app screen"
                    width={2700}
                    height={1440}
                    sizes="(min-width: 1360px) 1120px, 90vw"
                    priority
                  />
                  <Image
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border object-cover dark:hidden"
                    src="/images/bg-hero.jpg"
                    alt="app screen"
                    width={2700}
                    height={1440}
                    sizes="(min-width: 1360px) 1120px, 90vw"
                    priority
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <section className="bg-background pb-section-xs pt-section-xs md:pb-section-md">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                href="/"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span> Meet Our Customers</span>

                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              {CLIENTS.map((client) => (
                <div key={client.name} className="flex">
                  <Image
                    className="mx-auto h-auto w-auto object-contain dark:invert"
                    src={client.logo}
                    alt={`${client.name} Logo`}
                    width={client.width}
                    height={client.height}
                    sizes={`${client.width}px`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
