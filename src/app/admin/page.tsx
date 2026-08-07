import { getDb } from '@/lib/db';
import MarkPaidButton from '@/components/MarkPaidButton';

export const dynamic = 'force-dynamic';

type Registration = {
  id: number;
  name: string;
  email: string;
  phone: string;
  program: string;
  paid: boolean;
  created_at: string;
};

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const programLabels: Record<string, { label: string; color: string }> = {
  youth:   { label: 'Youth',   color: 'bg-green-100 text-green-800'   },
  teen:    { label: 'Teen',    color: 'bg-blue-100 text-blue-800'     },
  adult:   { label: 'Adult',   color: 'bg-purple-100 text-purple-800' },
  private: { label: 'Private', color: 'bg-orange-100 text-orange-800' },
};

export default async function AdminPage() {
  const sql = getDb();
  const [registrations, messages] = await Promise.all([
    sql`SELECT * FROM registrations ORDER BY created_at DESC`.then((r) => r as Registration[]),
    sql`SELECT * FROM contact_messages ORDER BY created_at DESC`.then((r) => r as ContactMessage[]),
  ]);

  const total = registrations.length;
  const byProg = Object.fromEntries(
    Object.keys(programLabels).map((p) => [p, registrations.filter((r) => r.program === p).length])
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">


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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Registrations</h2>
        {registrations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
            No registrations yet.
          </div>
        ) : (
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
                  {registrations.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-gray-900">{r.name}</td>
                      <td className="px-5 py-4 text-gray-600">{r.email}</td>
                      <td className="px-5 py-4 text-gray-600">{r.phone}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${programLabels[r.program]?.color ?? 'bg-gray-100 text-gray-800'}`}>
                          {programLabels[r.program]?.label ?? r.program}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {r.paid ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-semibold">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                            Paid
                          </span>
                        ) : (
                          <MarkPaidButton id={r.id} />
                        )}
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">
                        {new Date(r.created_at).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Contact messages */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Messages</h2>
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
            No messages yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.email}</p>
                  </div>
                  <p className="text-xs text-gray-400 shrink-0">
                    {new Date(m.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
