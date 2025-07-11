import Image from 'next/image';

type Person = {
  id: string;
  name: string;
  netWorth: number;
  bio: string;
  country: string;
  state: string;
  city: string;
  squareImage: string;
  financialAssets?: {
    ticker: string;
    numberOfShares: number;
    sharePrice: number;
  }[];
};

async function getPerson(id: string): Promise<Person> {
  const response = await fetch(
    `https://billions-api.nomadcoders.wokers.dev/person/${id}`,
    {
      cache: 'no-store',
    },
  );
  return response.json();
}

export default async function PersonPage({
  params,
}: {
  params: { id: string };
}) {
  const person = await getPerson(params.id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center bg-white shadow p-6 rounded-xl text-center">
        <Image
          src={person.squareImage}
          alt={person.name}
          className="size-48 rounded-full"
        />
        <h1>{person.name}</h1>
        <p>Net Worth: ${person.netWorth.toFixed(2)}B</p>
        <p>
          Location: {person.country}, {person.state}, {person.city}
        </p>
        <p>Bio: {person.bio || 'No bio available'}</p>

        {person.financialAssets && person.financialAssets.length > 0 && (
          <>
            <h2>Financial Assets</h2>
            <ul>
              {person.financialAssets.map((asset, idx) => (
                <li key={idx}>
                  {asset.ticker}: {asset.numberOfShares} shares @ $
                  {asset.sharePrice}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
