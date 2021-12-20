import React, {useEffect} from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   {
//     id: 'q1',
//     author: 'Celeste',
//     text: 'It is what it is'
//   },
//   {
//     id: 'q2',
//     author: 'Shan',
//     text: 'Dems the breaks'
//   }
// ];

const QuoteDetail = () => {
  const match = useRouteMatch();

  const params = useParams();

  const { quoteId } = params;

  const {sendRequest, status, data: loadedQuote, error} = useHttp(
    getSingleQuote, 
    true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // const quote = DUMMY_QUOTES.find(
  //   quote => quote.id === params.quoteId
  // );

  if (status === 'pending') { 
    return (
      <div className='centered'>
      <LoadingSpinner />
    </div>
    );
  }

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found!</p>
  }

  // if (!quote) {
  //   return <p>No quote found</p>
  // };

  // match this url and add /comments to go to comments page
  // `${match.path}`
  
  return (
    <>
      <h1>Quote Detail Page </h1>
      <HighlightedQuote
        text={loadedQuote.text}
        author={loadedQuote.author}
      />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link
            className='btn--flat'
            to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;