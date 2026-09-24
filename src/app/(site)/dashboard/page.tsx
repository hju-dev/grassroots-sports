import { redirect } from 'next/navigation';

// Gallery is the first editor; more sections (images, text) get their own
// tab and this page becomes a simple menu when there is more than one.
export default function DashboardHome() {
  redirect('/dashboard/gallery');
}
