import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  {
    id: 'q1',
    author: 'Celeste',
    text: 'It is what it is'
  },
  {
    id: 'q2',
    author: 'Shan',
    text: 'Dems the breaks'
  }
];

const AllQuotes = () => {
  return (
    <QuoteList quotes={DUMMY_QUOTES}/>

  )
};

export default AllQuotes;