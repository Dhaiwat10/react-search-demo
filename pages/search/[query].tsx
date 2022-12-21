import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Result {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const Page = () => {
  const router = useRouter();
  const { query } = router.query;

  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!query) return;

    const search = async () => {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await res.json();
      setResults(data.items);
    };

    search();
  }, [query]);

  return (
    <div>
      <h1>Search results for {query}</h1>
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.name}</h3>
          <p>{result.description}</p>
          <a href={result.html_url}>View on GitHub</a>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Page;
