import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'en' ? 'Privacy Policy | Grass Roots Sports' : 'นโยบายความเป็นส่วนตัว | Grass Roots Sports',
    robots: { index: false },
  };
}

const CONTACT_EMAIL = 'team@grassrootssports.org';
const linkClass = 'text-[var(--color-forest)] hover:underline';
const h2Class = 'text-xl font-bold text-[var(--color-black)] mb-3';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  const mail = (
    <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
      {CONTACT_EMAIL}
    </a>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 md:py-24">
      <h1 className="text-5xl md:text-6xl text-[var(--color-black)] mb-2">
        {isEn ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}
      </h1>
      <p className="text-[var(--color-muted)] text-sm mb-12">
        {isEn ? 'Last updated: September 2026' : 'อัปเดตล่าสุด: กันยายน 2569'}
      </p>

      <div className="prose prose-sm max-w-none text-[var(--color-body)] space-y-10">

        {isEn ? (
          <>
            <section>
              <h2 className={h2Class}>1. Who We Are</h2>
              <p className="leading-relaxed">Grass Roots Sports (&quot;we&quot;, &quot;us&quot;) is a community basketball academy in Pattaya, Thailand, operated by Alex Dovey. We run grassrootssports.org. We decide how the personal data described here is used. For anything about your data, contact {mail}.</p>
            </section>

            <section>
              <h2 className={h2Class}>2. What We Collect and Why</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Registration form:</strong> your name, email address, phone number and the program you choose. We use it to reply to you, confirm your place, and send program information and schedule changes. Legal basis: your consent, and steps you ask us to take before enrolling.</li>
                <li><strong>Contact form:</strong> your name, email address and message. We use it only to answer you. Legal basis: your consent.</li>
                <li><strong>Children:</strong> youth and teen programs are registered by a parent or guardian. We ask for the adult&apos;s details, not the child&apos;s. If we later need a child&apos;s name, age or medical information, we will ask the parent or guardian separately and explain why.</li>
                <li><strong>Photos and video:</strong> only if you agree on the registration form. See section 6.</li>
                <li><strong>Website analytics:</strong> only if you accept analytics cookies (section 7), we use Google Analytics to count visits and see which pages are used. We also use Vercel Analytics, which does not use cookies.</li>
                <li><strong>Payments:</strong> we do not collect card or bank details. PromptPay QR codes are made in your browser.</li>
                <li><strong>Technical data:</strong> like all websites, our host receives your IP address and browser details when you load a page. It is used to keep the site running and secure, and to limit abuse of our forms.</li>
              </ul>
            </section>

            <section>
              <h2 className={h2Class}>3. Who Receives Your Data</h2>
              <p className="leading-relaxed mb-3">We do not sell your data or use it for advertising. We use these providers to run the site. Each handles data only on our behalf:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Vercel: website hosting, cookie-free analytics and photo storage</li>
                <li>Neon: our database (servers in Singapore)</li>
                <li>Resend: sending our emails (servers in Japan)</li>
                <li>Google: analytics, only if you accept analytics cookies</li>
                <li>Clerk: sign-in for our staff only. Visitors are not affected.</li>
              </ul>
              <p className="leading-relaxed mt-3">We may also share data if the law requires it.</p>
            </section>

            <section>
              <h2 className={h2Class}>4. Sending Data Abroad</h2>
              <p className="leading-relaxed">Some of these providers store or process data outside Thailand, including in Singapore, Japan and the United States. We choose providers with security and data-protection commitments, and we send each only what it needs.</p>
            </section>

            <section>
              <h2 className={h2Class}>5. How Long We Keep It</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Contact messages: 12 months, then deleted.</li>
                <li>Registrations: kept while you are enrolled or in touch with us, and deleted 2 years after your last contact.</li>
                <li>We review and delete old records once a year. If you ask us to delete your data sooner, we do (section 8).</li>
              </ul>
            </section>

            <section>
              <h2 className={h2Class}>6. Photos and Video of Participants</h2>
              <p className="leading-relaxed">We only publish a photo or video of you or your child if you agreed on the registration form. You can withdraw that agreement at any time by emailing {mail}. We will remove the images from our website and our social media pages within 30 days. We cannot remove copies that other people have already saved or shared.</p>
            </section>

            <section>
              <h2 className={h2Class}>7. Cookies</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>Strictly needed:</strong> a language cookie (<code>NEXT_LOCALE</code>) that remembers whether you chose English or Thai, and a cookie (<code>gr_consent</code>) that remembers your answer to the cookie banner. Neither identifies you.</li>
                <li><strong>Analytics (only if you accept):</strong> Google Analytics cookies that measure visits. If you decline, we do not load Google Analytics. You can change your choice at any time with &quot;Cookie settings&quot; at the bottom of any page.</li>
              </ul>
              <p className="leading-relaxed mt-3">We use no advertising cookies.</p>
            </section>

            <section>
              <h2 className={h2Class}>8. Your Rights</h2>
              <p className="leading-relaxed mb-3">Under Thailand&apos;s Personal Data Protection Act B.E. 2562 (PDPA), you can ask to:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>See the personal data we hold about you and get a copy</li>
                <li>Correct data that is wrong</li>
                <li>Delete your data, or restrict or object to how we use it</li>
                <li>Withdraw consent at any time</li>
                <li>Complain to Thailand&apos;s Personal Data Protection Committee</li>
              </ul>
              <p className="mt-3 text-sm">Email {mail}. We will reply within 30 days and may need to confirm who you are first.</p>
            </section>

            <section>
              <h2 className={h2Class}>9. Security</h2>
              <p className="leading-relaxed">We use encrypted connections (HTTPS), limit staff access with sign-in, and keep backups. If a data breach is likely to put you at risk, we will tell you and the authorities as the law requires.</p>
            </section>

            <section>
              <h2 className={h2Class}>10. Changes to This Policy</h2>
              <p className="leading-relaxed">When we change this policy we change the date at the top. If a change affects how we use your data, we will ask for your consent again where the law requires it.</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className={h2Class}>1. เกี่ยวกับเรา</h2>
              <p className="leading-relaxed">Grass Roots Sports (&quot;เรา&quot;) เป็นสถาบันบาสเกตบอลชุมชนในพัทยา ประเทศไทย ดำเนินการโดย Alex Dovey เราดำเนินเว็บไซต์ grassrootssports.org และเป็นผู้กำหนดวิธีการใช้ข้อมูลส่วนบุคคลที่อธิบายไว้ที่นี่ หากมีคำถามเกี่ยวกับข้อมูลของคุณ ติดต่อ {mail}</p>
            </section>

            <section>
              <h2 className={h2Class}>2. ข้อมูลที่เราเก็บและเหตุผล</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>แบบฟอร์มลงทะเบียน:</strong> ชื่อ อีเมล เบอร์โทรศัพท์ และโปรแกรมที่คุณเลือก เราใช้เพื่อตอบกลับ ยืนยันที่นั่ง และส่งข้อมูลโปรแกรมและการเปลี่ยนแปลงตารางเวลา ฐานทางกฎหมาย: ความยินยอมของคุณ และการดำเนินการตามคำขอของคุณก่อนลงทะเบียน</li>
                <li><strong>แบบฟอร์มติดต่อ:</strong> ชื่อ อีเมล และข้อความ เราใช้เพื่อตอบคุณเท่านั้น ฐานทางกฎหมาย: ความยินยอมของคุณ</li>
                <li><strong>เด็ก:</strong> โปรแกรมเยาวชนและวัยรุ่นลงทะเบียนโดยผู้ปกครอง เราขอข้อมูลของผู้ปกครอง ไม่ใช่ของเด็ก หากภายหลังจำเป็นต้องใช้ชื่อ อายุ หรือข้อมูลสุขภาพของเด็ก เราจะขอจากผู้ปกครองแยกต่างหากและอธิบายเหตุผล</li>
                <li><strong>ภาพถ่ายและวิดีโอ:</strong> เฉพาะเมื่อคุณยินยอมในแบบฟอร์มลงทะเบียน ดูข้อ 6</li>
                <li><strong>การวิเคราะห์เว็บไซต์:</strong> เฉพาะเมื่อคุณยอมรับคุกกี้วิเคราะห์ (ข้อ 7) เราใช้ Google Analytics เพื่อนับการเข้าชมและดูว่าหน้าใดถูกใช้งาน และใช้ Vercel Analytics ซึ่งไม่ใช้คุกกี้</li>
                <li><strong>การชำระเงิน:</strong> เราไม่เก็บข้อมูลบัตรหรือบัญชีธนาคาร QR Code PromptPay สร้างขึ้นในเบราว์เซอร์ของคุณ</li>
                <li><strong>ข้อมูลทางเทคนิค:</strong> เช่นเดียวกับเว็บไซต์ทั่วไป ผู้ให้บริการโฮสต์ของเราได้รับที่อยู่ IP และรายละเอียดเบราว์เซอร์เมื่อคุณเปิดหน้าเว็บ ใช้เพื่อให้เว็บไซต์ทำงานและปลอดภัย และจำกัดการใช้แบบฟอร์มในทางที่ผิด</li>
              </ul>
            </section>

            <section>
              <h2 className={h2Class}>3. ใครได้รับข้อมูลของคุณ</h2>
              <p className="leading-relaxed mb-3">เราไม่ขายข้อมูลของคุณและไม่ใช้เพื่อการโฆษณา เราใช้ผู้ให้บริการต่อไปนี้เพื่อดำเนินเว็บไซต์ แต่ละรายจัดการข้อมูลในนามของเราเท่านั้น:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Vercel: โฮสต์เว็บไซต์ การวิเคราะห์แบบไม่ใช้คุกกี้ และที่เก็บภาพถ่าย</li>
                <li>Neon: ฐานข้อมูลของเรา (เซิร์ฟเวอร์ในสิงคโปร์)</li>
                <li>Resend: ส่งอีเมลของเรา (เซิร์ฟเวอร์ในญี่ปุ่น)</li>
                <li>Google: การวิเคราะห์ เฉพาะเมื่อคุณยอมรับคุกกี้วิเคราะห์</li>
                <li>Clerk: การเข้าสู่ระบบของเจ้าหน้าที่เท่านั้น ไม่กระทบผู้เข้าชม</li>
              </ul>
              <p className="leading-relaxed mt-3">เราอาจเปิดเผยข้อมูลหากกฎหมายกำหนด</p>
            </section>

            <section>
              <h2 className={h2Class}>4. การส่งข้อมูลไปต่างประเทศ</h2>
              <p className="leading-relaxed">ผู้ให้บริการบางรายจัดเก็บหรือประมวลผลข้อมูลนอกประเทศไทย รวมถึงในสิงคโปร์ ญี่ปุ่น และสหรัฐอเมริกา เราเลือกผู้ให้บริการที่มีมาตรการรักษาความปลอดภัยและคุ้มครองข้อมูล และส่งให้แต่ละรายเฉพาะสิ่งที่จำเป็น</p>
            </section>

            <section>
              <h2 className={h2Class}>5. ระยะเวลาการเก็บข้อมูล</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>ข้อความติดต่อ: 12 เดือน แล้วลบ</li>
                <li>การลงทะเบียน: เก็บไว้ในระหว่างที่คุณเป็นผู้เข้าร่วมหรือยังติดต่อกับเรา และลบเมื่อครบ 2 ปีหลังการติดต่อครั้งสุดท้าย</li>
                <li>เราตรวจสอบและลบข้อมูลเก่าปีละครั้ง หากคุณขอให้ลบเร็วกว่านั้น เราจะดำเนินการ (ข้อ 8)</li>
              </ul>
            </section>

            <section>
              <h2 className={h2Class}>6. ภาพถ่ายและวิดีโอของผู้เข้าร่วม</h2>
              <p className="leading-relaxed">เราจะเผยแพร่ภาพถ่ายหรือวิดีโอของคุณหรือบุตรหลานของคุณเฉพาะเมื่อคุณยินยอมในแบบฟอร์มลงทะเบียน คุณถอนความยินยอมได้ทุกเมื่อโดยส่งอีเมลถึง {mail} เราจะลบภาพออกจากเว็บไซต์และโซเชียลมีเดียของเราภายใน 30 วัน เราไม่สามารถลบสำเนาที่ผู้อื่นบันทึกหรือแชร์ไปแล้วได้</p>
            </section>

            <section>
              <h2 className={h2Class}>7. คุกกี้</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>จำเป็น:</strong> คุกกี้ภาษา (<code>NEXT_LOCALE</code>) ที่จำว่าคุณเลือกภาษาอังกฤษหรือไทย และคุกกี้ (<code>gr_consent</code>) ที่จำคำตอบของคุณต่อแบนเนอร์คุกกี้ ทั้งสองไม่ระบุตัวตนของคุณ</li>
                <li><strong>การวิเคราะห์ (เฉพาะเมื่อคุณยอมรับ):</strong> คุกกี้ Google Analytics ที่วัดจำนวนการเข้าชม หากคุณปฏิเสธ เราจะไม่โหลด Google Analytics คุณเปลี่ยนการเลือกได้ทุกเมื่อที่ &quot;ตั้งค่าคุกกี้&quot; ท้ายทุกหน้า</li>
              </ul>
              <p className="leading-relaxed mt-3">เราไม่ใช้คุกกี้เพื่อการโฆษณา</p>
            </section>

            <section>
              <h2 className={h2Class}>8. สิทธิ์ของคุณ</h2>
              <p className="leading-relaxed mb-3">ภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) คุณสามารถขอ:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>เข้าถึงข้อมูลส่วนบุคคลที่เราเก็บไว้และขอรับสำเนา</li>
                <li>แก้ไขข้อมูลที่ไม่ถูกต้อง</li>
                <li>ลบข้อมูล หรือจำกัดหรือคัดค้านการใช้ข้อมูล</li>
                <li>ถอนความยินยอมได้ทุกเวลา</li>
                <li>ร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</li>
              </ul>
              <p className="mt-3 text-sm">ส่งอีเมลถึง {mail} เราจะตอบกลับภายใน 30 วัน และอาจขอยืนยันตัวตนก่อน</p>
            </section>

            <section>
              <h2 className={h2Class}>9. ความปลอดภัย</h2>
              <p className="leading-relaxed">เราใช้การเชื่อมต่อที่เข้ารหัส (HTTPS) จำกัดการเข้าถึงของเจ้าหน้าที่ด้วยการเข้าสู่ระบบ และสำรองข้อมูล หากเกิดเหตุละเมิดข้อมูลที่อาจกระทบต่อคุณ เราจะแจ้งคุณและหน่วยงานที่เกี่ยวข้องตามที่กฎหมายกำหนด</p>
            </section>

            <section>
              <h2 className={h2Class}>10. การเปลี่ยนแปลงนโยบายนี้</h2>
              <p className="leading-relaxed">เมื่อเราเปลี่ยนแปลงนโยบายนี้ เราจะเปลี่ยนวันที่ด้านบน หากการเปลี่ยนแปลงกระทบวิธีที่เราใช้ข้อมูลของคุณ เราจะขอความยินยอมใหม่ตามที่กฎหมายกำหนด</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
