import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Privacy Policy | Grass Roots Sports' : 'นโยบายความเป็นส่วนตัว | Grass Roots Sports',
    robots: { index: false },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-5xl md:text-6xl text-[var(--color-black)] mb-2">
        {isEn ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}
      </h1>
      <p className="text-[var(--color-muted)] text-sm mb-12">
        {isEn ? 'Last updated: August 2025' : 'อัปเดตล่าสุด: สิงหาคม 2568'}
      </p>

      <div className="prose prose-sm max-w-none text-[var(--color-body)] space-y-10">

        {isEn ? (
          <>
            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">1. Who We Are</h2>
              <p className="leading-relaxed">Grass Roots Sports ("we", "us", "our") is a community basketball academy based in Pattaya, Thailand. We operate the website at grassrootssports.org. For questions about this policy, contact us at <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">2. Data We Collect</h2>
              <p className="leading-relaxed mb-3">We collect personal data only when you voluntarily provide it:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Registration form:</strong> name, email address, phone number, child's name and age (for youth/teen programs), selected program</li>
                <li><strong>Contact form:</strong> name, email address, message content</li>
                <li><strong>Payment:</strong> we do not store payment details. PromptPay QR codes are generated locally in your browser and no card or bank data passes through our servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">3. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>To confirm your registration and send program information</li>
                <li>To respond to your contact enquiries</li>
                <li>To notify you of schedule updates, upcoming events, or program changes</li>
                <li>We do not sell, rent, or share your data with third parties for marketing purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">4. Data Retention</h2>
              <p className="leading-relaxed">We retain your personal data for as long as necessary to provide our services and comply with legal obligations — typically no longer than 3 years after your last interaction with us. You may request deletion at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">5. Your Rights (PDPA)</h2>
              <p className="leading-relaxed mb-3">Under Thailand's Personal Data Protection Act B.E. 2562 (PDPA), you have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the Personal Data Protection Committee</li>
              </ul>
              <p className="mt-3 text-sm">To exercise any of these rights, email <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a>. We will respond within 30 days.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">6. Cookies</h2>
              <p className="leading-relaxed">This website does not use tracking cookies or third-party analytics. We use only essential session-level storage required for the site to function.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">7. Changes to This Policy</h2>
              <p className="leading-relaxed">We may update this policy from time to time. The date at the top of this page will always reflect the latest version. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">1. เกี่ยวกับเรา</h2>
              <p className="leading-relaxed">Grass Roots Sports ("เรา") เป็นสถาบันบาสเกตบอลชุมชนในพัทยา ประเทศไทย เราดำเนินเว็บไซต์ที่ grassrootssports.org หากมีคำถามเกี่ยวกับนโยบายนี้ ติดต่อเราที่ <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a></p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">2. ข้อมูลที่เราเก็บรวบรวม</h2>
              <p className="leading-relaxed mb-3">เราเก็บข้อมูลส่วนบุคคลเฉพาะเมื่อคุณให้ข้อมูลโดยสมัครใจ:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>แบบฟอร์มลงทะเบียน:</strong> ชื่อ อีเมล เบอร์โทรศัพท์ ชื่อและอายุของเด็ก (สำหรับโปรแกรมเยาวชน/วัยรุ่น) โปรแกรมที่เลือก</li>
                <li><strong>แบบฟอร์มติดต่อ:</strong> ชื่อ อีเมล ข้อความ</li>
                <li><strong>การชำระเงิน:</strong> เราไม่เก็บข้อมูลการชำระเงิน QR Code PromptPay สร้างขึ้นในเบราว์เซอร์ของคุณ ไม่มีข้อมูลบัตรหรือธนาคารผ่านเซิร์ฟเวอร์ของเรา</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">3. วิธีที่เราใช้ข้อมูลของคุณ</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>เพื่อยืนยันการลงทะเบียนและส่งข้อมูลโปรแกรม</li>
                <li>เพื่อตอบคำถามจากแบบฟอร์มติดต่อ</li>
                <li>เพื่อแจ้งข้อมูลตารางเวลา กิจกรรม หรือการเปลี่ยนแปลงโปรแกรม</li>
                <li>เราไม่ขาย ให้เช่า หรือแชร์ข้อมูลของคุณกับบุคคลที่สามเพื่อวัตถุประสงค์ทางการตลาด</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">4. การเก็บรักษาข้อมูล</h2>
              <p className="leading-relaxed">เราเก็บข้อมูลส่วนบุคคลของคุณเท่าที่จำเป็นในการให้บริการและปฏิบัติตามกฎหมาย โดยทั่วไปไม่เกิน 3 ปีหลังจากการติดต่อครั้งสุดท้าย คุณสามารถขอให้ลบข้อมูลได้ทุกเมื่อ</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">5. สิทธิ์ของคุณ (PDPA)</h2>
              <p className="leading-relaxed mb-3">ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณมีสิทธิ์:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>เข้าถึงข้อมูลส่วนบุคคลที่เราเก็บไว้</li>
                <li>แก้ไขข้อมูลที่ไม่ถูกต้อง</li>
                <li>ขอให้ลบข้อมูลของคุณ</li>
                <li>ถอนความยินยอมได้ทุกเวลา</li>
                <li>ร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</li>
              </ul>
              <p className="mt-3 text-sm">ส่งอีเมลมาที่ <a href="mailto:akdovey@gmail.com" className="text-[var(--color-forest)] hover:underline">akdovey@gmail.com</a> เราจะตอบกลับภายใน 30 วัน</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">6. คุกกี้</h2>
              <p className="leading-relaxed">เว็บไซต์นี้ไม่ใช้คุกกี้ติดตามหรือการวิเคราะห์จากบุคคลที่สาม เราใช้เฉพาะการจัดเก็บระดับเซสชันที่จำเป็นสำหรับการทำงานของเว็บไซต์</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-black)] mb-3">7. การเปลี่ยนแปลงนโยบายนี้</h2>
              <p className="leading-relaxed">เราอาจอัปเดตนโยบายนี้เป็นครั้งคราว วันที่ด้านบนจะแสดงเวอร์ชันล่าสุดเสมอ การใช้เว็บไซต์ต่อไปหลังจากการเปลี่ยนแปลงถือเป็นการยอมรับนโยบายที่อัปเดต</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
