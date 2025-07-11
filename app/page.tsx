import Image from 'next/image';
import Link from 'next/link';

type Person = {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
};

async function getBillionaires(): Promise<Person[]> {
  const response = await fetch(
    'https://billions-api.nomadcoders.workers.dev/',
    {
      cache: 'no-store',
    },
  );
  return response.json();
}

function isValidImageUrl(url: string | undefined): boolean {
  return !!url && url.startsWith('https://');
}

export default async function Home() {
  const people = await getBillionaires();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md: grid-cols-4 lg:grid-cols-5 gap-6">
        {people.map((person) => (
          <Link
            href={`/person/${person.id}`}
            key={person.id}
            className="flex flex-col items-center justify-center"
          >
            {isValidImageUrl(person.squareImage) ? (
              <Image
                src={person.squareImage}
                alt={person.name}
                width={100}
                height={100}
              />
            ) : (
              <div className="size-24 bg-gray-200 rounded-full" />
            )}
            <h3>{person.name}</h3>
            <p>{person.netWorth.toFixed(2)}B</p>
            <small>{person.industries.join(', ')}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
