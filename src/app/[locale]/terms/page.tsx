import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Terms & Conditions | Grass Roots Sports' : 'ข้อกำหนดและเงื่อนไข | Grass Roots Sports',
    robots: { index: false },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-5xl md:text-6xl text-[var(--color-black)] mb-2">
        {isEn ? 'Terms & Conditions' : 'ข้อกำหนดและเงื่อนไข'}
      </h1>
      <p className="text-[var(--color-muted)] text-sm mb-12">
        {isEn ? 'Last updated: August 2025' : 'อัปเดตล่าสุด: สิงหาคม 2568'}
      </p>

      <div className="text-[var(--color-body)] space-y-10">

        {isEn ? (
          <>
            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">1. Acceptance</h2>
              <p className="leading-relaxed text-sm">By using this website or registering for any Grass Roots Sports program, you agree to these terms. If you are registering on behalf of a minor, you confirm you are their parent or legal guardian and accept these terms on their behalf.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">2. Program Registration</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Registration is an expression of interest. A place is confirmed only once payment is received and you receive written confirmation from us.</li>
                <li>Program availability is subject to minimum enrolment numbers. We reserve the right to cancel or reschedule programs with reasonable notice.</li>
                <li>Participants must meet the age requirements stated for each program.</li>
                <li>We reserve the right to decline registration where we believe it is not in the best interest of the participant or group.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">3. Payment</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>All fees are quoted and payable in Thai Baht (THB).</li>
                <li>Payment is accepted via PromptPay QR code. Cash payments may be arranged directly with the coach.</li>
                <li>Fees must be paid in advance to secure a place.</li>
                <li>Pricing is subject to change. Any changes will not affect confirmed enrolments.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">4. Cancellations & Refunds</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Cancelled by participant:</strong> Refunds are at the discretion of Grass Roots Sports. Please contact us as early as possible.</li>
                <li><strong>Cancelled by us:</strong> A full refund will be issued if we cancel a session or program.</li>
                <li><strong>Missed sessions:</strong> No refund is given for sessions missed by the participant due to illness, travel, or other personal reasons, unless otherwise agreed in writing.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">5. Health, Safety & Conduct</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Participants attend at their own risk. Grass Roots Sports is not liable for injury arising from participation in sporting activities.</li>
                <li>Participants (or their guardians) confirm they are medically fit to participate. Any relevant medical conditions must be disclosed to the coach before the first session.</li>
                <li>Respectful behaviour toward coaches, other participants, and facility staff is required at all times. We reserve the right to remove anyone who behaves in a manner detrimental to the group.</li>
                <li>Participants must wear appropriate sports attire and footwear.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">6. Photography & Media</h2>
              <p className="leading-relaxed text-sm">Photos and videos may be taken during sessions for use on our website and social media. If you do not consent to your or your child's image being used, please notify us in writing before the first session.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">7. Governing Law</h2>
              <p className="leading-relaxed text-sm">These terms are governed by the laws of Thailand. Any disputes will be subject to the jurisdiction of the Thai courts.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">8. Contact</h2>
              <p className="leading-relaxed text-sm">Questions about these terms? Email <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a>.</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">1. การยอมรับ</h2>
              <p className="leading-relaxed text-sm">การใช้เว็บไซต์นี้หรือการลงทะเบียนโปรแกรมใดๆ ของ Grass Roots Sports ถือเป็นการยอมรับข้อกำหนดเหล่านี้ หากคุณลงทะเบียนในนามของผู้เยาว์ คุณยืนยันว่าคุณเป็นผู้ปกครองหรือผู้ปกครองตามกฎหมาย</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">2. การลงทะเบียนโปรแกรม</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>การลงทะเบียนเป็นการแสดงความสนใจ ที่นั่งจะได้รับการยืนยันเมื่อได้รับการชำระเงินและได้รับการยืนยันเป็นลายลักษณ์อักษรจากเรา</li>
                <li>ความพร้อมของโปรแกรมขึ้นอยู่กับจำนวนผู้เข้าร่วมขั้นต่ำ เราสงวนสิทธิ์ยกเลิกหรือเลื่อนโปรแกรมพร้อมแจ้งล่วงหน้า</li>
                <li>ผู้เข้าร่วมต้องมีอายุตามที่กำหนดสำหรับแต่ละโปรแกรม</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">3. การชำระเงิน</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>ค่าธรรมเนียมทั้งหมดเป็นสกุลเงินบาทไทย (THB)</li>
                <li>รับชำระผ่าน QR Code PromptPay การชำระด้วยเงินสดสามารถนัดหมายกับโค้ชโดยตรง</li>
                <li>ต้องชำระค่าธรรมเนียมล่วงหน้าเพื่อยืนยันที่นั่ง</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">4. การยกเลิกและการคืนเงิน</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>ยกเลิกโดยผู้เข้าร่วม:</strong> การคืนเงินขึ้นอยู่กับดุลยพินิจของ Grass Roots Sports กรุณาติดต่อเราโดยเร็วที่สุด</li>
                <li><strong>ยกเลิกโดยเรา:</strong> จะคืนเงินเต็มจำนวนหากเรายกเลิกเซสชันหรือโปรแกรม</li>
                <li><strong>เซสชันที่ขาด:</strong> ไม่คืนเงินสำหรับเซสชันที่ขาดเนื่องจากเจ็บป่วย เดินทาง หรือเหตุส่วนตัว เว้นแต่จะตกลงกันเป็นลายลักษณ์อักษร</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">5. สุขภาพ ความปลอดภัย และพฤติกรรม</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>ผู้เข้าร่วมเข้าร่วมโดยความเสี่ยงของตนเอง Grass Roots Sports ไม่รับผิดชอบต่อการบาดเจ็บจากการเข้าร่วมกิจกรรมกีฬา</li>
                <li>ผู้เข้าร่วมยืนยันว่ามีสุขภาพพร้อมสำหรับการเข้าร่วม ต้องแจ้งอาการทางการแพทย์ที่เกี่ยวข้องก่อนเซสชันแรก</li>
                <li>ต้องมีพฤติกรรมที่เคารพต่อโค้ช ผู้เข้าร่วมคนอื่น และเจ้าหน้าที่สถานที่ตลอดเวลา</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">6. กฎหมายที่ใช้บังคับ</h2>
              <p className="leading-relaxed text-sm">ข้อกำหนดเหล่านี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทใดๆ จะอยู่ภายใต้เขตอำนาจศาลไทย</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">7. ติดต่อ</h2>
              <p className="leading-relaxed text-sm">มีคำถาม? อีเมล <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a></p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
