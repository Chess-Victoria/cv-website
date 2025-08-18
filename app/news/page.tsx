import { redirect } from 'next/navigation';

export default function NewsIndex() {
	return redirect('/news/page-1');
}