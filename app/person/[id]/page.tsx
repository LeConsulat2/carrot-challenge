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

export default async function Home() {
  const people = await getBillionaires();

  return (
    <div>
      {people.map((person) => (
        <Link
          href={`/person/${person.id}`}
          key={person.id}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={person.squareImage}
            alt={person.name}
            width={100}
            height={100}
          />
          <h3>{person.name}</h3>
          <p>{person.netWorth.toFixed(2)}B</p>
          <small>{person.industries.join(',')}</small>
        </Link>
      ))}
    </div>
  );
}
