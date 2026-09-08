import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Accessibility Statement | Grass Roots Sports' : 'คำแถลงด้านการเข้าถึง | Grass Roots Sports',
    robots: { index: false },
  };
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-5xl md:text-6xl text-[var(--color-black)] mb-2">
        {isEn ? 'Accessibility Statement' : 'คำแถลงด้านการเข้าถึง'}
      </h1>
      <p className="text-[var(--color-muted)] text-sm mb-12">
        {isEn ? 'Last updated: September 2026' : 'อัปเดตล่าสุด: กันยายน 2569'}
      </p>

      <div className="prose prose-sm max-w-none text-[var(--color-body)] space-y-10">
        {isEn ? (
          <>
            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">Our Commitment</h2>
              <p className="leading-relaxed">
                Grass Roots Sports believes sport, and the ability to find out about it, should never have an age limit or be reserved for people who fit one mould. We want grassrootssports.org to be usable by as many people as possible, including people using screen readers, keyboard-only navigation, or browsers with motion or high-contrast settings enabled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">Standard We Aim For</h2>
              <p className="leading-relaxed">
                We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. This site has not been through a formal third-party accessibility audit, so we cannot claim full compliance, but it reflects our current best effort and is something we keep working on as the site grows.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">What We&apos;ve Done</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Descriptive alt text on meaningful images</li>
                <li>Semantic HTML headings and landmarks so screen readers can navigate the page structure</li>
                <li>Decorative motion (background pulses, glows) respects your operating system&apos;s &quot;reduce motion&quot; setting</li>
                <li>Text and background colors chosen for reasonable contrast</li>
                <li>The site is available in both English and Thai, with the page language correctly announced to assistive technology</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">Known Limitations</h2>
              <p className="leading-relaxed">
                Grass Roots Sports is a new, small organisation and this site is still evolving. If you encounter a page, form, or feature that is difficult to use with assistive technology, we want to know so we can fix it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">Feedback</h2>
              <p className="leading-relaxed">
                If you have trouble accessing any part of this site, or need information in a different format, please contact us at{' '}
                <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a>. We will do our best to respond within a few days and address the issue.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">ความมุ่งมั่นของเรา</h2>
              <p className="leading-relaxed">
                Grass Roots Sports เชื่อว่ากีฬาและการเข้าถึงข้อมูลเกี่ยวกับกีฬาไม่ควรมีข้อจำกัดด้านอายุหรือถูกสงวนไว้สำหรับคนกลุ่มใดกลุ่มหนึ่ง เราต้องการให้ grassrootssports.org ใช้งานได้กับคนให้มากที่สุดเท่าที่จะทำได้ รวมถึงผู้ที่ใช้โปรแกรมอ่านหน้าจอ การนำทางด้วยแป้นพิมพ์ หรือเบราว์เซอร์ที่ตั้งค่าลดการเคลื่อนไหวหรือเพิ่มความคมชัด
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">มาตรฐานที่เรายึดถือ</h2>
              <p className="leading-relaxed">
                เรามุ่งหมายให้เว็บไซต์นี้เป็นไปตามแนวทาง Web Content Accessibility Guidelines (WCAG) 2.1 ระดับ AA เว็บไซต์นี้ยังไม่ผ่านการตรวจสอบด้านการเข้าถึงโดยหน่วยงานภายนอกอย่างเป็นทางการ จึงยังไม่สามารถยืนยันว่าเป็นไปตามมาตรฐานได้ครบถ้วน แต่สะท้อนความพยายามที่ดีที่สุดของเราในปัจจุบัน และเป็นสิ่งที่เราพัฒนาต่อเนื่อง
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">สิ่งที่เราได้ทำแล้ว</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>ข้อความอธิบายภาพ (alt text) สำหรับรูปภาพที่สำคัญ</li>
                <li>โครงสร้าง HTML แบบ semantic เพื่อให้โปรแกรมอ่านหน้าจอนำทางได้</li>
                <li>ภาพเคลื่อนไหวตกแต่ง (เช่น แสงเรืองแสง) จะปรับตามการตั้งค่า &quot;ลดการเคลื่อนไหว&quot; ของระบบปฏิบัติการ</li>
                <li>เลือกสีข้อความและพื้นหลังให้มีความคมชัดที่เหมาะสม</li>
                <li>เว็บไซต์รองรับทั้งภาษาอังกฤษและภาษาไทย โดยระบุภาษาของหน้าให้ถูกต้องสำหรับเทคโนโลยีช่วยเหลือ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">ข้อจำกัดที่ทราบ</h2>
              <p className="leading-relaxed">
                Grass Roots Sports เป็นองค์กรใหม่ขนาดเล็ก และเว็บไซต์นี้ยังคงพัฒนาอย่างต่อเนื่อง หากคุณพบหน้า แบบฟอร์ม หรือฟีเจอร์ใดที่ใช้งานยากกับเทคโนโลยีช่วยเหลือ เราอยากทราบเพื่อนำไปแก้ไข
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">ข้อเสนอแนะ</h2>
              <p className="leading-relaxed">
                หากคุณพบปัญหาในการเข้าถึงส่วนใดของเว็บไซต์นี้ หรือต้องการข้อมูลในรูปแบบอื่น กรุณาติดต่อเราที่{' '}
                <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a> เราจะพยายามตอบกลับภายในไม่กี่วันและแก้ไขปัญหาดังกล่าว
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
