import type { Metadata } from 'next';
import Link from 'next/link';
import { PartnerIcon, TrendingUpIcon, CommunityIcon, BasketballIcon, TargetIcon, GrowthIcon } from '@/components/Icons';
import { buildAlternates } from '@/lib/seo';
import CourtLines from '@/components/CourtLines';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Partners & Sponsorship | Grass Roots Sports' : 'พาร์ทเนอร์ | Grass Roots Sports',
    description: isEn
      ? 'Partner with Grass Roots Sports: sponsorship, investment, facility partnerships, and team opportunities in Pattaya, Thailand.'
      : 'เป็นพาร์ทเนอร์กับ Grass Roots Sports สปอนเซอร์ การลงทุน และโอกาสด้านกีฬาในพัทยา',
    alternates: buildAlternates(locale, '/partners'),
  };
}

const sponsorshipTiers = [
  {
    Icon: GrowthIcon,
    title: 'Title / Principal Sponsor',
    desc: 'Exclusive association with the Grass Roots Sports brand. Your name alongside ours on all programs, venues, communications, and events. The highest-visibility partnership we offer.',
    badge: 'Flagship',
  },
  {
    Icon: BasketballIcon,
    title: 'Program Sponsor',
    desc: 'Co-brand a specific program: "Youth Basketball presented by [Your Brand]", for example. Direct connection to one audience: families, teens, adults, or private clients.',
    badge: 'Available',
  },
  {
    Icon: TargetIcon,
    title: 'Equipment & Kit Partner',
    desc: 'Supply basketballs, training gear, apparel, or court equipment. Your brand in players\' hands every session. High-frequency, high-visibility exposure at the grassroots level.',
    badge: 'Available',
  },
  {
    Icon: PartnerIcon,
    title: 'Community & Media Partner',
    desc: 'Local businesses, hospitality providers, media outlets, and community organisations. Cross-promotion, event presence, and authentic connection to Pattaya\'s sporting community.',
    badge: 'Available',
  },
];

const teamRoles = [
  {
    title: 'Head Coach / Assistant Coach',
    desc: 'Basketball coaching experience required. Open to Thai and international candidates. Work across our youth, teen, and adult programs.',
  },
  {
    title: 'Program Coordinator',
    desc: 'Organise sessions, manage registrations, and support coaches on the ground. Bilingual (EN/TH) a strong advantage.',
  },
  {
    title: 'Admin & Marketing Support',
    desc: 'Help build the brand, manage social content, and keep operations running smoothly as we launch and grow.',
  },
  {
    title: 'Community Liaison',
    desc: 'Connect us with schools, clubs, local organisations, and businesses. Ideal for someone with strong existing networks in Pattaya.',
  },
];

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-gradient text-white py-16 md:py-24 px-4">
        <CourtLines className="text-white/10" fit="contain" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-4">Partner With Us</h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            Help build something that matters: quality, accessible sport for all ages in Pattaya, Thailand.
          </p>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-16 md:py-20 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-6">
            The Opportunity
          </p>
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] mb-6">
            Get in early on something real.
          </h2>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            Grass Roots Sports is building the sporting infrastructure that Pattaya doesn&apos;t yet have: structured programs, professional coaching, and a genuine community around basketball. We are at the beginning of that journey, and we are looking for partners who want to be part of it from the ground up.
          </p>
          <p className="text-[var(--color-body)] leading-relaxed">
            Whether you are a local business looking for community presence, a brand seeking authentic sporting exposure, a facility that wants to be at the centre of something growing, or an investor with a long view, there is a partnership here for you.
          </p>
        </div>
      </section>

      {/* Sponsorship tiers */}
      <section className="py-16 md:py-20 px-4 bg-[var(--color-sage)]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-4">
            Sponsorship
          </p>
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] text-center mb-12">
            Sponsorship Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sponsorshipTiers.map(({ Icon, title, desc, badge }) => (
              <div key={title} className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <Icon className="w-10 h-10 text-[var(--color-forest)] flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider bg-[var(--color-forest)]/10 text-[var(--color-forest)] px-2.5 py-1 rounded-full">
                    {badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-black)]">{title}</h3>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-muted)] mt-8">
            All sponsorship packages are tailored. Get in touch to discuss what works for your brand and budget.
          </p>
        </div>
      </section>

      {/* Facility partners */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] mb-4">
            Facilities
          </p>
          <h2 className="text-3xl md:text-4xl text-[var(--color-black)] mb-6">
            Facility Partners
          </h2>
          <p className="text-[var(--color-body)] leading-relaxed mb-4">
            We are actively seeking courts, sports halls, and multi-use facilities in Pattaya to host our programs. A facility partnership gives your space a consistent, professional user and connects you to a growing community of players, parents, and supporters.
          </p>
          <p className="text-[var(--color-body)] leading-relaxed">
            Hotels, resorts, schools, and community centres with basketball courts or open sports space are particularly welcome to reach out.
          </p>
        </div>
      </section>

      {/* Investment */}
      <section id="invest" className="py-16 md:py-20 px-4 bg-[var(--color-black)] text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-4">
            Investment
          </p>
          <h2 className="text-3xl md:text-5xl text-center mb-6">Investment Partners</h2>
          <div className="space-y-4 text-white/80 leading-relaxed mb-10">
            <p>
              Grass Roots Sports is building a long-term sporting organisation, not a single program, but a platform for community sport across Thailand. We are in the early stages of that vision, and we are seeking investment partners who share our commitment to it.
            </p>
            <p>
              We are looking for individuals, organisations, and funds who understand the value of grassroots sport as both a social good and a commercial opportunity. Investment conversations are open and we welcome any level of engagement, from initial dialogue to formal partnership.
            </p>
            <p>
              If you are interested in understanding more about where Grass Roots Sports is headed and how you can be part of it, we would love to hear from you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="text-center bg-[var(--color-forest)] hover:bg-[var(--color-lime)] text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Join the team */}
      <section id="team" className="py-16 md:py-20 px-4 bg-[var(--color-offwhite)]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-forest)] text-center mb-4">
            Careers & Volunteers
          </p>
          <h2 className="text-3xl md:text-5xl text-[var(--color-black)] text-center mb-4">
            Join the Team
          </h2>
          <p className="text-center text-[var(--color-body)] mb-12 max-w-xl mx-auto">
            As Grass Roots Sports grows, so will the people behind it. We are building a team that reflects our values: community-first, high standards, and a genuine love of sport.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {teamRoles.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border border-[var(--color-black)]/5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CommunityIcon className="w-7 h-7 text-[var(--color-forest)] flex-shrink-0" />
                  <h3 className="font-bold text-[var(--color-black)]">{title}</h3>
                </div>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-muted)] mt-8">
            No open positions listed yet, but we are always interested in hearing from the right people.
          </p>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[var(--color-forest)] text-white py-14 md:py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to talk?</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Whether you have a specific partnership in mind or just want to learn more, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-white text-[var(--color-forest)] hover:bg-[var(--color-lime)] hover:text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              Contact Us
            </Link>
            <a
              href="https://instagram.com/akdovey"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/50 hover:border-white text-white font-bold py-3.5 px-8 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              Follow @akdovey
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
