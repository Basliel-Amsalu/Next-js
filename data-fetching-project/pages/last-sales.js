import { useEffect, useState } from "react";
import useSWR from "swr";

async function fetcher(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const { data, error } = useSWR(
    "https://nextjs-a0910-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );
  console.log(sales);
  useEffect(() => {
    if (data) {
      const transformedSales = Object.keys(data).map((key) => ({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      }));

      setSales(transformedSales);
    }
  }, [data, error]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-a0910-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = Object.keys(data).map((key) => ({
    id: key,
    username: data[key].username,
    volume: data[key].volume,
  }));
  return {
    props: { sales: transformedSales },
  };
}

export default LastSalesPage;
