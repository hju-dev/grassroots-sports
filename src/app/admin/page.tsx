// TODO: Protect this route with Clerk auth when CLERK_SECRET_KEY is set
// Add middleware.ts: clerkMiddleware() + createRouteMatcher(['/admin(.*)'])

const programLabels: Record<string, { label: string; color: string }> = {
  youth:   { label: 'Youth',   color: 'bg-green-100 text-green-800' },
  teen:    { label: 'Teen',    color: 'bg-blue-100 text-blue-800'   },
  adult:   { label: 'Adult',   color: 'bg-purple-100 text-purple-800' },
  private: { label: 'Private', color: 'bg-orange-100 text-orange-800' },
};

// Replace with real DB query once Neon is connected:
// const registrations = await db.select().from(registrationsTable).orderBy(desc(registrationsTable.createdAt));
const mockRegistrations = [
  { id: 1, name: 'James Wilson',    email: 'james@example.com',   phone: '082 345 6789', program: 'youth',   paid: false, date: '2025-08-05' },
  { id: 2, name: 'Nattaporn K.',    email: 'natt@example.com',    phone: '089 234 5678', program: 'teen',    paid: true,  date: '2025-08-05' },
  { id: 3, name: 'Michael Torres',  email: 'michael@example.com', phone: '091 876 5432', program: 'adult',   paid: false, date: '2025-08-04' },
  { id: 4, name: 'Sophie Martin',   email: 'sophie@example.com',  phone: '083 456 7890', program: 'private', paid: false, date: '2025-08-04' },
  { id: 5, name: 'Somchai P.',      email: 'somchai@example.com', phone: '087 654 3210', program: 'youth',   paid: true,  date: '2025-08-03' },
  { id: 6, name: 'Emma Clarke',     email: 'emma@example.com',    phone: '094 321 0987', program: 'teen',    paid: false, date: '2025-08-03' },
];

// Replace with real DB query once Neon is connected:
// const messages = await db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt));
const mockMessages = [
  { id: 1, name: 'David Lim',   email: 'david@example.com',   message: 'Interested in adult leagues — when do you launch?',                date: '2025-08-05' },
  { id: 2, name: 'Anchalee S.', email: 'anchalee@example.com', message: 'My son is 8 years old. Is youth basketball suitable for beginners?', date: '2025-08-04' },
];

export default function AdminPage() {
  const total  = mockRegistrations.length;
  const byProg = Object.fromEntries(
    Object.keys(programLabels).map((p) => [p, mockRegistrations.filter((r) => r.program === p).length])
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">

      {/* Pending banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Neon DB', desc: 'Registrations are mock data. Wire /api/register to save rows.', color: 'border-yellow-400 bg-yellow-50' },
          { label: 'Clerk Auth', desc: 'This page is unprotected. Add middleware when CLERK_SECRET_KEY is set.', color: 'border-orange-400 bg-orange-50' },
          { label: 'Resend Email', desc: 'Confirmation emails are disabled. Add RESEND_API_KEY to Vercel.', color: 'border-blue-400 bg-blue-50' },
        ].map((b) => (
          <div key={b.label} className={`border-l-4 rounded-lg px-4 py-3 ${b.color}`}>
            <p className="text-xs font-bold uppercase tracking-wider mb-1">{b.label} Pending</p>
            <p className="text-xs text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
        <div className="bg-white rounded-xl p-5 border border-gray-100 col-span-2 sm:col-span-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</p>
          <p className="text-4xl font-black text-gray-900">{total}</p>
        </div>
        {Object.entries(byProg).map(([prog, count]) => (
          <div key={prog} className="bg-white rounded-xl p-5 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{programLabels[prog].label}</p>
            <p className="text-4xl font-black text-gray-900">{count}</p>
          </div>
        ))}
      </div>

      {/* Registrations table */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Registrations</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Mock data</span>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Name', 'Email', 'Phone', 'Program', 'Paid', 'Date'].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockRegistrations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900">{r.name}</td>
                    <td className="px-5 py-4 text-gray-600">{r.email}</td>
                    <td className="px-5 py-4 text-gray-600">{r.phone}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${programLabels[r.program].color}`}>
                        {programLabels[r.program].label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block w-2 h-2 rounded-full ${r.paid ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="ml-2 text-xs text-gray-500">{r.paid ? 'Paid' : 'Pending'}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact messages */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Mock data</span>
        </div>
        <div className="flex flex-col gap-3">
          {mockMessages.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.email}</p>
                </div>
                <p className="text-xs text-gray-400 shrink-0">{m.date}</p>
              </div>
              <p className="text-sm text-gray-600">{m.message}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
