import Apollo11Analysis from '@/components/Apollo11/Apollo11Analysis';

export const metadata = {
  title: 'Apollo 11 Guidance Computer | Code Analysis',
  description: 'An interactive exploration of the Apollo 11 Guidance Computer source code - the software that guided humanity to the moon.',
  keywords: ['Apollo 11', 'AGC', 'Guidance Computer', 'NASA', 'Margaret Hamilton', 'Assembly Code', 'Space Programming'],
  openGraph: {
    title: 'Apollo 11 Guidance Computer | Code Analysis',
    description: 'An interactive exploration of the Apollo 11 Guidance Computer source code - the software that guided humanity to the moon.',
    type: 'article',
  },
};

export default function Apollo11Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Apollo11Analysis />
    </main>
  );
}